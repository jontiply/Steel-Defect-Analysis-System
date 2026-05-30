from flask import Flask, request, jsonify
from flask_cors import CORS
import onnxruntime as ort
import numpy as np
from PIL import Image
import json
import io

app = Flask(__name__)
CORS(app, origins="*")
# Load class names
with open('class_names.json') as f:
    class_names = json.load(f)

# Load ONNX model — much lighter than PyTorch
session = ort.InferenceSession('model.onnx')
print("ONNX model loaded")

def preprocess(image):
    image = image.resize((224, 224)).convert('RGB')
    img = np.array(image).astype(np.float32) / 255.0
    mean = np.array([0.485, 0.456, 0.406])
    std  = np.array([0.229, 0.224, 0.225])
    img = (img - mean) / std
    img = img.transpose(2, 0, 1)       # HWC → CHW
    img = np.expand_dims(img, axis=0)  # add batch dim
    return img.astype(np.float32)

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    image = Image.open(io.BytesIO(request.files['image'].read()))
    tensor = preprocess(image)
    
    outputs = session.run(None, {"input": tensor})[0]
    predicted_idx = int(np.argmax(outputs[0]))
    
    # Softmax for confidence
    exp = np.exp(outputs[0] - np.max(outputs[0]))
    probs = exp / exp.sum()
    confidence = round(float(probs[predicted_idx]) * 100, 2)
    
    return jsonify({
        'defect': class_names[predicted_idx],
        'confidence': confidence
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)