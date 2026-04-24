import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUndo, FaCheck, FaMousePointer } from "react-icons/fa";

const SignaturePad = ({ onSave, initialSignature }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureSaved, setSignatureSaved] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Load initial signature if exists
      if (initialSignature) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setSignatureSaved(true);
        };
        img.src = initialSignature;
      }
    }
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setSignatureSaved(false);
    onSave(null);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let hasDrawing = false;
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (
          imageData.data[i] !== 255 ||
          imageData.data[i + 1] !== 255 ||
          imageData.data[i + 2] !== 255
        ) {
          hasDrawing = true;
          break;
        }
      }
      if (hasDrawing) {
        setSignatureSaved(true);
        onSave(dataURL);
      }
    }
  };

  return (
    <div>
      <div
        style={{
          border: `2px solid ${signatureSaved ? "#4caf50" : "var(--border-color)"}`,
          borderRadius: "12px",
          background: "white",
          marginBottom: "10px",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{
            width: "100%",
            height: "150px",
            cursor: "crosshair",
            touchAction: "none",
          }}
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <motion.button
          type="button"
          onClick={clearSignature}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: "8px 16px",
            background: "#f44336",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FaUndo size={12} /> Clear
        </motion.button>
        <motion.button
          type="button"
          onClick={saveSignature}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: "8px 16px",
            background: "var(--accent)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FaCheck size={12} /> Save Signature
        </motion.button>
      </div>
      {signatureSaved && (
        <p style={{ fontSize: "11px", color: "#4caf50", marginTop: "10px" }}>
          ✓ Signature saved
        </p>
      )}
      <p
        style={{
          fontSize: "10px",
          color: "var(--text-secondary)",
          marginTop: "8px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <FaMousePointer size={10} /> Use mouse or touch to draw your signature
      </p>
    </div>
  );
};

export default SignaturePad;
