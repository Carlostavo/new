"use client";
import React, { useRef, useState } from "react";

export default function EditableText({ initialText, defaultStyles, isEditing }) {
  const [text, setText] = useState(initialText);
  const textRef = useRef(null);

  const handleInput = (e) => {
    setText(e.currentTarget.innerHTML);
  };

  // Aplicar estilos ya sea al sombreo o al bloque completo
  const applyStyle = (style) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    if (selection && !selection.isCollapsed) {
      // sombreo parcial
      const span = document.createElement("span");
      Object.assign(span.style, style);
      range.surroundContents(span);
    } else {
      // bloque entero
      Object.assign(textRef.current.style, style);
    }
  };

  return (
    <div
      ref={textRef}
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onInput={handleInput}
      style={{
        ...defaultStyles,
        outline: isEditing ? "1px dashed #888" : "none",
        padding: "2px",
        borderRadius: "4px",
      }}
    >
      {text}
    </div>
  );
}
