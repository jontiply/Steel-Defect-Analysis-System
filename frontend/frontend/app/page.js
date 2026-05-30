"use client";

import { useState, useRef, useCallback } from "react";
import ResultCard from "@/components/ResultCard";
import UploadZone from "@/components/UploadZone";
import AnalyzingState from "@/components/AnalyzingState";
import AboutModal from "@/components/AboutModal";

export default function Home() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImage(file);
    setResult(null);
    setError(null);
    setPreview(URL.createObjectURL(file));
  }, []);

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setResult(null);
    const formData = new FormData();
    formData.append("image", image);
    try {
      const res = await fetch("https://steel-defect-analysis-system.onrender.com", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch {
      setError("Cannot connect to server. Make sure Flask is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(145deg, #f0f4f8 0%, #e8edf2 40%, #dde4ec 100%)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
      {/* Chrome texture overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.6) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 80%, rgba(200,215,230,0.4) 0%, transparent 60%)`,
      }} />

      {/* Topbar */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.8), 0 2px 12px rgba(0,0,0,0.06)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Tata logo placeholder */}
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "linear-gradient(135deg, #003087 0%, #0050c8 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,48,135,0.3)",
            }}>
              <span style={{ color: "white", fontWeight: 900, fontSize: 13, letterSpacing: "-0.5px" }}>TS</span>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.3px" }}>Tata Steel</div>
              <div style={{ fontSize: 11, color: "#64748b", letterSpacing: "0.5px" }}>DEFECT ANALYSIS SYSTEM</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: 20,
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600, fontFamily: "monospace" }}>MODEL LIVE</span>
            </div>
            <button
              onClick={() => setShowAbout(true)}
              style={{
                padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                background: "linear-gradient(135deg, #1e3a6e 0%, #1d4ed8 100%)",
                color: "white", border: "none", cursor: "pointer",
                boxShadow: "0 2px 8px rgba(29,78,216,0.3)",
              }}
            >
              About Project
            </button>
          </div>
        </div>
      </header>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "48px 28px 64px" }}>

        {/* Hero */}
        <div style={{ marginBottom: 48, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 12px", borderRadius: 20, marginBottom: 16,
              background: "rgba(29,78,216,0.08)", border: "1px solid rgba(29,78,216,0.15)",
            }}>
              <span style={{ fontSize: 11, color: "#1d4ed8", fontWeight: 600, letterSpacing: "1px" }}>AI · COMPUTER VISION · RESNET-18</span>
            </div>
            <h1 style={{
              fontSize: 52, fontWeight: 900, lineHeight: 1, letterSpacing: "-2px",
              color: "#0f172a", marginBottom: 12,
            }}>
              Surface Defect
              <br />
              <span style={{
                background: "linear-gradient(135deg, #1e3a6e 0%, #2563eb 50%, #0891b2 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Scanner
              </span>
            </h1>
            <p style={{ color: "#64748b", fontSize: 16, maxWidth: 480, lineHeight: 1.6 }}>
              Upload a steel surface image and our fine-tuned ResNet-18 model classifies the defect type across 6 categories with 98%+ accuracy.
            </p>
          </div>

          {/* Stats strip */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "Val Accuracy", value: "98.26%" },
              { label: "Classes", value: "6 types" },
              { label: "Training Images", value: "1,152" },
              { label: "Model", value: "ResNet-18" },
            ].map(({ label, value }) => (
              <div key={label} style={{
                padding: "12px 20px", borderRadius: 14, textAlign: "center",
                background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#1e3a6e", letterSpacing: "-0.5px" }}>{value}</div>
                <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <UploadZone
              preview={preview}
              dragOver={dragOver}
              setDragOver={setDragOver}
              handleFile={handleFile}
              handleReset={handleReset}
              image={image}
            />

            {image && !loading && (
              <button
                onClick={handleAnalyze}
                style={{
                  width: "100%", padding: "16px", borderRadius: 16,
                  fontSize: 14, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
                  background: "linear-gradient(135deg, #1e3a6e 0%, #2563eb 60%, #0891b2 100%)",
                  color: "white", border: "none", cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={e => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                ⚡ Run Defect Analysis
              </button>
            )}

            {error && (
              <div style={{
                padding: "14px 18px", borderRadius: 12,
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                color: "#dc2626", fontSize: 13, fontFamily: "monospace",
              }}>
                ⚠ {error}
              </div>
            )}

            {/* Defect classes reference */}
            <div style={{
              padding: 20, borderRadius: 16,
              background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 }}>
                Detectable Defect Classes
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { name: "Crazing", color: "#f59e0b" },
                  { name: "Inclusion", color: "#ef4444" },
                  { name: "Patches", color: "#8b5cf6" },
                  { name: "Pitted Surface", color: "#06b6d4" },
                  { name: "Rolled-in Scale", color: "#64748b" },
                  { name: "Scratches", color: "#3b82f6" },
                ].map(({ name, color }) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            {loading && <AnalyzingState />}
            {result && !loading && <ResultCard result={result} />}
            {!loading && !result && (
              <div style={{
                minHeight: 420, borderRadius: 20,
                background: "rgba(255,255,255,0.5)", border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 16, padding: 40,
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="28" height="28" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ color: "#64748b", fontWeight: 600, marginBottom: 4 }}>Awaiting Analysis</p>
                  <p style={{ color: "#94a3b8", fontSize: 13 }}>Upload a steel surface image to begin</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(0,0,0,0.08)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "monospace" }}>
            Subrata Bhakat · B.Tech AIML · BIT Mesra · 2nd Year
          </span>
          <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "monospace" }}>
            Flask API · localhost:5000 · NEU-DET Dataset
          </span>
        </div>
      </div>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

      <style jsx global>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </main>
  );
}