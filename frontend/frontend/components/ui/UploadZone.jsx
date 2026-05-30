"use client";

import { useRef } from "react";

export default function UploadZone({ preview, dragOver, setDragOver, handleFile, handleReset, image }) {
  const inputRef = useRef(null);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={() => setDragOver(false)}
      onClick={() => !preview && inputRef.current?.click()}
      className={`relative rounded-3xl border-2 transition-all duration-300 overflow-hidden
        ${preview ? "border-white/10 cursor-default" : "cursor-pointer"}
        ${dragOver
          ? "border-blue-400/60 bg-blue-500/5 scale-[1.01]"
          : preview
          ? "border-white/10 bg-white/[0.02]"
          : "border-white/10 bg-white/[0.02] hover:border-blue-400/30 hover:bg-blue-500/[0.03]"
        }`}
      style={{ minHeight: "320px" }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {preview ? (
        /* Image preview */
        <div className="relative">
          <img
            src={preview}
            alt="Steel surface"
            className="w-full object-cover rounded-3xl"
            style={{ maxHeight: "380px" }}
          />
          {/* Overlay controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/80 font-mono truncate max-w-[200px]">
                {image?.name}
              </span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleReset(); }}
              className="bg-black/40 backdrop-blur-sm rounded-xl p-2 border border-white/10 hover:bg-red-500/20 hover:border-red-400/30 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        /* Empty upload state */
        <div className="flex flex-col items-center justify-center gap-5 p-12 min-h-[320px]">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300
              ${dragOver ? "bg-blue-500/20 scale-110" : "bg-white/5"}`}
          >
            <svg
              className={`w-10 h-10 transition-colors duration-300 ${dragOver ? "text-blue-400" : "text-slate-500"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>

          <div className="text-center">
            <p className="text-white/70 font-medium mb-1">
              {dragOver ? "Drop it here" : "Drop image here"}
            </p>
            <p className="text-slate-500 text-sm">or click to browse</p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600 font-mono">
            <span>JPG</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>PNG</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>BMP</span>
          </div>
        </div>
      )}
    </div>
  );
}