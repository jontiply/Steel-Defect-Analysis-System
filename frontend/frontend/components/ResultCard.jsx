"use client";

const DEFECT_INFO = {
  crazing: {
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    light: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    dot: "#f59e0b",
    severity: "Medium",
    sevColor: "#d97706",
    sevBg: "rgba(245,158,11,0.1)",
    description: "Network of fine cracks caused by thermal stress or uneven cooling during production.",
  },
  inclusion: {
    gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
    light: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.2)",
    dot: "#ef4444",
    severity: "High",
    sevColor: "#dc2626",
    sevBg: "rgba(239,68,68,0.1)",
    description: "Foreign material embedded within steel during the manufacturing process.",
  },
  patches: {
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    light: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
    dot: "#8b5cf6",
    severity: "Low",
    sevColor: "#7c3aed",
    sevBg: "rgba(139,92,246,0.1)",
    description: "Irregular surface discolorations due to uneven rolling pressure or cooling.",
  },
  pitted_surface: {
    gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
    light: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.2)",
    dot: "#06b6d4",
    severity: "Medium",
    sevColor: "#0891b2",
    sevBg: "rgba(6,182,212,0.1)",
    description: "Small depressions or cavities caused by corrosion or scale removal.",
  },
  rolled_in_scale: {
    gradient: "linear-gradient(135deg, #64748b, #475569)",
    light: "rgba(100,116,139,0.08)",
    border: "rgba(100,116,139,0.2)",
    dot: "#64748b",
    severity: "High",
    sevColor: "#475569",
    sevBg: "rgba(100,116,139,0.1)",
    description: "Oxide scale pressed into steel surface during the hot rolling process.",
  },
  scratches: {
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
    light: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
    dot: "#3b82f6",
    severity: "Low",
    sevColor: "#2563eb",
    sevBg: "rgba(59,130,246,0.1)",
    description: "Linear marks caused by mechanical contact during production or handling.",
  },
};

export default function ResultCard({ result }) {
  const key = result.defect.replace(/-/g, "_");
  const info = DEFECT_INFO[key] || DEFECT_INFO["scratches"];
  const displayName = result.defect.replace(/_/g, " ").replace(/-/g, " ");
  const confidence = result.confidence;

  return (
    <div style={{
      borderRadius: 20, overflow: "hidden",
      border: `1px solid ${info.border}`,
      background: info.light,
      boxShadow: "0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
      animation: "fadeInUp 0.5s ease forwards",
    }}>
      {/* Top gradient bar */}
      <div style={{ height: 4, background: info.gradient }} />

      <div style={{ padding: 28 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%", background: info.dot,
                boxShadow: `0 0 0 3px ${info.dot}20`,
                animation: "pulse 2s ease-in-out infinite",
              }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "1px", textTransform: "uppercase" }}>
                Defect Detected
              </span>
            </div>
            <h2 style={{
              fontSize: 36, fontWeight: 900, letterSpacing: "-1px",
              background: info.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              textTransform: "capitalize", lineHeight: 1,
            }}>
              {displayName}
            </h2>
          </div>
          <div style={{
            padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700,
            color: info.sevColor, background: info.sevBg,
            border: `1px solid ${info.border}`,
          }}>
            {info.severity} Severity
          </div>
        </div>

        {/* Confidence */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Model Confidence</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.5px", fontFamily: "monospace" }}>
              {confidence}%
            </span>
          </div>
          <div style={{ height: 8, borderRadius: 99, background: "rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 99, background: info.gradient,
              width: `${confidence}%`,
              animation: "growWidth 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              boxShadow: `0 0 8px ${info.dot}50`,
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            {["0%", "25%", "50%", "75%", "100%"].map(v => (
              <span key={v} style={{ fontSize: 9, color: "#cbd5e1", fontFamily: "monospace" }}>{v}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div style={{
          padding: "14px 16px", borderRadius: 12, marginBottom: 20,
          background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.07)",
        }}>
          <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>{info.description}</p>
        </div>

        {/* Meta grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Model", value: "ResNet-18" },
            { label: "Dataset", value: "NEU-DET" },
            { label: "Val Accuracy", value: "98.26%" },
            { label: "Total Classes", value: "6 defects" },
          ].map(({ label, value }) => (
            <div key={label} style={{
              padding: "10px 14px", borderRadius: 10,
              background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.07)",
            }}>
              <div style={{ fontSize: 9, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes growWidth { from { width: 0%; } to { width: ${confidence}%; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}