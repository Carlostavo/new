"use client";
import React, { useRef, useState } from "react";
import { applyStyleToSelection, applyStyleToElement } from "./utils/textStyles";

export default function EditableText({ initialText, defaultStyles, isEditing }) {
  const [text, setText] = useState(initialText);
  const textRef = useRef(null);

  const handleInput = (e) => {
    setText(e.currentTarget.innerHTML);
  };

  // Función para aplicar estilos desde el panel
  const applyStyle = (style) => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      applyStyleToSelection(style); // sombreo parcial
    } else {
      applyStyleToElement(textRef.current, style); // cuadro entero
    }
  };

  return (
    <div
      ref={textRef}
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onInput={handleInput}
      style={{ ...defaultStyles, outline: isEditing ? "1px dashed #888" : "none", padding: "4px" }}
    >
      {text}
    </div>
  );
}
