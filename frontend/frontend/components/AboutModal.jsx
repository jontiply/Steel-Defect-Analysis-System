"use client";

const TIMELINE = [
  {
    date: "May 20",
    day: "Day 1",
    title: "Project Assignment & Research",
    desc: "Received project brief from Tata Steel. Researched steel surface defect detection, studied existing approaches, and identified the NEU Surface Defect Dataset as the optimal training source.",
    tag: "Research",
    color: "#3b82f6",
  },
  {
    date: "May 21–22",
    day: "Day 2–3",
    title: "Dataset Acquisition & Analysis",
    desc: "Downloaded and analysed the NEU-DET dataset — 1,800 images across 6 defect classes. Explored class distribution, image characteristics, and confirmed suitability for transfer learning.",
    tag: "Data",
    color: "#8b5cf6",
  },
  {
    date: "May 23",
    day: "Day 4",
    title: "Model Architecture & Training Setup",
    desc: "Selected ResNet-18 pretrained on ImageNet. Configured transfer learning strategy — froze base layers, replaced final FC layer with 6-class head. Set up Google Colab with T4 GPU.",
    tag: "ML",
    color: "#f59e0b",
  },
  {
    date: "May 24–25",
    day: "Day 5–6",
    title: "Model Training & Evaluation",
    desc: "Trained for 15 epochs with Adam optimizer and CrossEntropyLoss. Achieved 98.26% validation accuracy. Applied data augmentation (flips, rotation) to improve generalisation.",
    tag: "Training",
    color: "#22c55e",
  },
  {
    date: "May 26",
    day: "Day 7",
    title: "Flask Backend Development",
    desc: "Built REST API with Flask. Implemented /analyze endpoint accepting image uploads, running inference with the trained model, and returning defect classification with confidence score.",
    tag: "Backend",
    color: "#06b6d4",
  },
  {
    date: "May 27–28",
    day: "Day 8–9",
    title: "Frontend Development",
    desc: "Built Next.js frontend with Tailwind CSS. Implemented drag-and-drop upload, image preview, real-time API integration, animated analysis state, and detailed result card.",
    tag: "Frontend",
    color: "#ec4899",
  },
  {
    date: "May 29",
    day: "Day 10",
    title: "Integration, Testing & Submission",
    desc: "End-to-end testing with real NEU dataset images. Verified all 6 defect classes, confirmed confidence scores, polished UI, and prepared project for submission.",
    tag: "Complete",
    color: "#1d4ed8",
  },
];

export default function AboutModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(15,23,42,0.5)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 720,
          maxHeight: "90vh", overflowY: "auto",
          borderRadius: 24,
          background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
          border: "1px solid rgba(0,0,0,0.1)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,1)",
          animation: "slideUp 0.3s ease",
        }}
      >
        {/* Modal header */}
        <div style={{
          padding: "28px 32px 24px",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          position: "sticky", top: 0, background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)", borderRadius: "24px 24px 0 0", zIndex: 10,
        }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "3px 10px", borderRadius: 20, marginBottom: 10,
              background: "rgba(29,78,216,0.08)", border: "1px solid rgba(29,78,216,0.15)",
            }}>
              <span style={{ fontSize: 10, color: "#1d4ed8", fontWeight: 700, letterSpacing: "1px" }}>PROJECT OVERVIEW</span>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.8px", marginBottom: 4 }}>
              Steel Defect Analysis System
            </h2>
            <p style={{ fontSize: 13, color: "#64748b" }}>Tata Steel AI/ML Internship Project · May 2026</p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(0,0,0,0.1)",
              background: "rgba(0,0,0,0.04)", cursor: "pointer", fontSize: 18, color: "#64748b",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >×</button>
        </div>

        <div style={{ padding: "28px 32px" }}>
          {/* Developer card */}
          <div style={{
            padding: 24, borderRadius: 18, marginBottom: 28,
            background: "linear-gradient(135deg, #1e3a6e 0%, #1d4ed8 60%, #0891b2 100%)",
            boxShadow: "0 8px 24px rgba(29,78,216,0.25)",
            position: "relative", overflow: "hidden",
          }}>
            {/* Chrome sheen */}
            <div style={{
              position: "absolute", top: -40, right: -40, width: 200, height: 200,
              borderRadius: "50%", background: "rgba(255,255,255,0.06)",
            }} />
            <div style={{
              position: "absolute", bottom: -60, left: -20, width: 160, height: 160,
              borderRadius: "50%", background: "rgba(255,255,255,0.04)",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, fontWeight: 900, color: "white",
                }}>SB</div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "white", letterSpacing: "-0.5px" }}>Subrata Bhakat</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>2nd Year · B.Tech AIML</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  { label: "Institution", value: "BIT Mesra" },
                  { label: "Branch", value: "AI & Machine Learning" },
                  { label: "Year", value: "2nd Year" },
                  { label: "Project", value: "Tata Steel Internship" },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    padding: "8px 14px", borderRadius: 10,
                    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
                  }}>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 13, color: "white", fontWeight: 600 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech stack */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 }}>
              Tech Stack
            </h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { name: "PyTorch", color: "#ef4444" },
                { name: "ResNet-18", color: "#f59e0b" },
                { name: "Google Colab", color: "#f59e0b" },
                { name: "Flask", color: "#22c55e" },
                { name: "Next.js", color: "#0f172a" },
                { name: "Tailwind CSS", color: "#06b6d4" },
                { name: "NEU Dataset", color: "#8b5cf6" },
                { name: "Transfer Learning", color: "#3b82f6" },
              ].map(({ name, color }) => (
                <span key={name} style={{
                  padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  background: `${color}12`, border: `1px solid ${color}30`, color: color,
                }}>{name}</span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 20 }}>
              Project Timeline · May 20 – 29, 2026
            </h3>
            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              <div style={{
                position: "absolute", left: 63, top: 8, bottom: 8, width: 1,
                background: "linear-gradient(to bottom, #e2e8f0, #cbd5e1, #e2e8f0)",
              }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {TIMELINE.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, paddingBottom: i < TIMELINE.length - 1 ? 20 : 0 }}>
                    {/* Date label */}
                    <div style={{ width: 56, flexShrink: 0, textAlign: "right", paddingTop: 2 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", fontFamily: "monospace" }}>{item.date}</div>
                      <div style={{ fontSize: 9, color: "#cbd5e1", fontFamily: "monospace" }}>{item.day}</div>
                    </div>

                    {/* Dot */}
                    <div style={{ flexShrink: 0, position: "relative", display: "flex", alignItems: "flex-start", paddingTop: 4 }}>
                      <div style={{
                        width: 14, height: 14, borderRadius: "50%",
                        background: item.color, border: "2px solid white",
                        boxShadow: `0 0 0 2px ${item.color}30, 0 2px 6px ${item.color}40`,
                        flexShrink: 0,
                      }} />
                    </div>

                    {/* Content */}
                    <div style={{
                      flex: 1, padding: "12px 16px", borderRadius: 14,
                      background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.07)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{item.title}</span>
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10,
                          background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}25`,
                        }}>{item.tag}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div style={{
            marginTop: 24, padding: "14px 18px", borderRadius: 12,
            background: "rgba(29,78,216,0.05)", border: "1px solid rgba(29,78,216,0.12)",
          }}>
            <p style={{ fontSize: 12, color: "#3b5fc0", lineHeight: 1.6 }}>
              <strong>Project Summary:</strong> Developed an end-to-end AI system for automated steel surface defect detection. 
              Fine-tuned ResNet-18 on the NEU dataset achieving 98.26% validation accuracy across 6 defect categories. 
              Deployed as a full-stack web application with Flask backend and Next.js frontend.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}