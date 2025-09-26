"use client";
import React from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";

export default function EditPanel({ selectedElement }) {
  // Aplica el estilo al sombreo o al cuadro completo
  const handleStyle = (style) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    if (selection && !selection.isCollapsed) {
      // sombreo parcial
      const span = document.createElement("span");
      Object.assign(span.style, style);
      range.surroundContents(span);
    } else if (selectedElement) {
      // cuadro entero
      Object.assign(selectedElement.style, style);
    }
  };

  const colors = [
    "#000000",
    "#444444",
    "#FF0000",
    "#0000FF",
    "#008000",
    "#FFA500",
    "#800080",
    "#FFD700",
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-50 border-r border-gray-300 shadow-md p-4 flex flex-col gap-6 z-50">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">
        ✨ Editar texto
      </h2>

      {/* Tamaño */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Tamaño
        </label>
        <input
          type="number"
          min="8"
          max="96"
          defaultValue={16}
          className="w-full border rounded px-2 py-1 focus:ring focus:ring-blue-200 outline-none"
          onChange={(e) => handleStyle({ fontSize: `${e.target.value}px` })}
        />
      </div>

      {/* Colores */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Colores
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c}
              className="w-6 h-6 rounded-full border hover:scale-110 transition"
              style={{ backgroundColor: c }}
              onClick={() => handleStyle({ color: c })}
            />
          ))}
          <input
            type="color"
            className="w-8 h-8 border rounded cursor-pointer"
            onChange={(e) => handleStyle({ color: e.target.value })}
          />
        </div>
      </div>

      {/* Alineación */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Alineación
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleStyle({ textAlign: "left" })}
            className="p-2 border rounded hover:bg-gray-200"
          >
            <FaAlignLeft />
          </button>
          <button
            onClick={() => handleStyle({ textAlign: "center" })}
            className="p-2 border rounded hover:bg-gray-200"
          >
            <FaAlignCenter />
          </button>
          <button
            onClick={() => handleStyle({ textAlign: "right" })}
            className="p-2 border rounded hover:bg-gray-200"
          >
            <FaAlignRight />
          </button>
        </div>
      </div>

      {/* Formato */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Formato
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleStyle({ fontWeight: "bold" })}
            className="p-2 border rounded hover:bg-gray-200"
          >
            <FaBold />
          </button>
          <button
            onClick={() => handleStyle({ fontStyle: "italic" })}
            className="p-2 border rounded hover:bg-gray-200"
          >
            <FaItalic />
          </button>
          <button
            onClick={() => handleStyle({ textDecoration: "underline" })}
            className="p-2 border rounded hover:bg-gray-200"
          >
            <FaUnderline />
          </button>
        </div>
      </div>
    </div>
  );
}
