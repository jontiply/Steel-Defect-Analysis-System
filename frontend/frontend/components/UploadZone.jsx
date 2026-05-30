"use client";

import { useRef } from "react";

export default function UploadZone({ preview, dragOver, setDragOver, handleFile, handleReset, image }) {
  const inputRef = useRef(null);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onClick={() => !preview && inputRef.current?.click()}
      style={{
        borderRadius: 20, minHeight: 300, overflow: "hidden",
        border: dragOver ? "2px solid #3b82f6" : "1px solid rgba(0,0,0,0.09)",
        background: dragOver
          ? "rgba(59,130,246,0.04)"
          : preview
          ? "rgba(255,255,255,0.5)"
          : "rgba(255,255,255,0.6)",
        boxShadow: dragOver
          ? "0 0 0 4px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.9)"
          : "0 1px 3px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
        cursor: preview ? "default" : "pointer",
        transition: "all 0.2s ease",
        transform: dragOver ? "scale(1.01)" : "scale(1)",
        display: "flex", flexDirection: "column",
      }}
    >
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
        onChange={e => handleFile(e.target.files[0])} />

      {preview ? (
        <div style={{ position: "relative", flex: 1 }}>
          <img src={preview} alt="Steel surface" style={{
            width: "100%", objectFit: "cover", borderRadius: 20,
            maxHeight: 340, display: "block",
          }} />
          {/* Overlay */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: 20,
            background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
          }} />
          <div style={{
            position: "absolute", bottom: 14, left: 14, right: 14,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "6px 12px", borderRadius: 10,
              background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", fontFamily: "monospace", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {image?.name}
              </span>
            </div>
            <button onClick={e => { e.stopPropagation(); handleReset(); }} style={{
              width: 32, height: 32, borderRadius: 8, cursor: "pointer",
              background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)", color: "white",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            }}>×</button>
          </div>
        </div>
      ) : (
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 16, padding: 40, minHeight: 300,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: dragOver ? "rgba(59,130,246,0.1)" : "rgba(0,0,0,0.04)",
            border: `1px solid ${dragOver ? "rgba(59,130,246,0.3)" : "rgba(0,0,0,0.08)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease", transform: dragOver ? "scale(1.1)" : "scale(1)",
          }}>
            <svg width="32" height="32" fill="none" stroke={dragOver ? "#3b82f6" : "#94a3b8"} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: dragOver ? "#2563eb" : "#475569", marginBottom: 4 }}>
              {dragOver ? "Release to upload" : "Drop steel surface image here"}
            </p>
            <p style={{ fontSize: 13, color: "#94a3b8" }}>or click to browse your files</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {["JPG", "PNG", "BMP"].map((fmt, i) => (
              <span key={fmt} style={{
                padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600,
                fontFamily: "monospace", color: "#94a3b8",
                background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)",
              }}>{fmt}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}