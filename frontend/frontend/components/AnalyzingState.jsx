"use client";

export default function AnalyzingState() {
  const steps = [
    "Preprocessing image to 224×224...",
    "Running ResNet-18 forward pass...",
    "Extracting 512-dim feature vector...",
    "Classifying across 6 defect types...",
  ];

  return (
    <div style={{
      minHeight: 420, borderRadius: 20, padding: 40,
      background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
    }}>
      {/* Scanner animation */}
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: 20,
          border: "1.5px solid rgba(37,99,235,0.2)",
        }} />
        <div style={{
          position: "absolute", inset: 0, borderRadius: 20,
          border: "2px solid transparent",
          borderTopColor: "#2563eb",
          animation: "spin 1.2s linear infinite",
        }} />
        <div style={{
          position: "absolute", inset: 8, borderRadius: 14,
          background: "rgba(37,99,235,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 16, height: 16, borderRadius: "50%",
            background: "rgba(37,99,235,0.4)",
            animation: "pulse 1.5s ease-in-out infinite",
          }} />
        </div>
        {/* Corner accents */}
        {[
          { top: 0, left: 0, borderWidth: "2px 0 0 2px" },
          { top: 0, right: 0, borderWidth: "2px 2px 0 0" },
          { bottom: 0, left: 0, borderWidth: "0 0 2px 2px" },
          { bottom: 0, right: 0, borderWidth: "0 2px 2px 0" },
        ].map((style, i) => (
          <div key={i} style={{
            position: "absolute", width: 12, height: 12,
            borderColor: "#2563eb", borderStyle: "solid",
            ...style,
          }} />
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Analyzing Surface</p>
        <p style={{ fontSize: 13, color: "#64748b" }}>Running neural network inference</p>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        {steps.map((step, i) => (
          <div key={step} style={{
            display: "flex", alignItems: "center", gap: 12,
            opacity: 0, animation: `fadeInUp 0.4s ease forwards`,
            animationDelay: `${i * 0.5}s`,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
              border: "1.5px solid rgba(37,99,235,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(37,99,235,0.05)",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb", opacity: 0.6 }} />
            </div>
            <span style={{ fontSize: 12, color: "#475569", fontFamily: "monospace" }}>{step}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}