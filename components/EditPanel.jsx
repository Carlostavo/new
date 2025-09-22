'use client';
import { useState, useEffect } from 'react';

export default function EditPanel({ isOpen, onClose, onStyleChange, selectedElement, onElementSelect }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    color: '#000000',
    fontSize: 'medium'
  });

  const colors = ['#000000', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#6b7280', '#ffffff'];
  const fontSizes = ['small', 'medium', 'large'];

  useEffect(() => {
    if (isOpen) {
      setIsExpanded(false);
    }
  }, [isOpen]);

  const handleStyleToggle = (style, value) => {
    const newStyles = {
      ...activeStyles,
      [style]: value
    };
    setActiveStyles(newStyles);
    onStyleChange(newStyles);
  };

  const handleColorSelect = (color) => {
    handleStyleToggle('color', color);
  };

  const handleFontSizeSelect = (size) => {
    handleStyleToggle('fontSize', size);
  };

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isOpen) return null;

  return (
    <div className={`edit-panel-compact ${isExpanded ? 'expanded' : ''}`}>
      <div className="edit-panel-compact-header" onClick={togglePanel}>
        <span className="text-lg">✎</span>
        {isExpanded && <span className="text-sm font-semibold">Editor</span>}
      </div>

      <div className="edit-panel-compact-content">
        {/* Elemento seleccionado */}
        {selectedElement && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">Editando:</div>
            <div className="text-sm font-medium truncate">{selectedElement.text}</div>
          </div>
        )}

        {/* Estilos rápidos */}
        <div className="style-controls-mini">
          <button
            className={`style-btn-mini ${activeStyles.bold ? 'active' : ''}`}
            onClick={() => handleStyleToggle('bold', !activeStyles.bold)}
            title="Negrita"
          >
            B
          </button>
          <button
            className={`style-btn-mini ${activeStyles.italic ? 'active' : ''}`}
            onClick={() => handleStyleToggle('italic', !activeStyles.italic)}
            title="Cursiva"
          >
            I
          </button>
          <button
            className={`style-btn-mini ${activeStyles.underline ? 'active' : ''}`}
            onClick={() => handleStyleToggle('underline', !activeStyles.underline)}
            title="Subrayado"
          >
            U
          </button>
        </div>

        {/* Tamaño de fuente */}
        <div className="mb-3">
          <div className="text-xs text-gray-600 mb-2">Tamaño:</div>
          <div className="flex gap-1">
            {fontSizes.map((size) => (
              <button
                key={size}
                className={`flex-1 text-xs py-1 rounded ${activeStyles.fontSize === size ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                onClick={() => handleFontSizeSelect(size)}
              >
                {size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L'}
              </button>
            ))}
          </div>
        </div>

        {/* Colores */}
        <div className="mb-3">
          <div className="text-xs text-gray-600 mb-2">Color:</div>
          <div className="color-palette-mini">
            {colors.map((color) => (
              <div
                key={color}
                className={`color-option-mini ${activeStyles.color === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="quick-actions">
          <button className="quick-action-btn" onClick={() => onElementSelect(null)}>
            <span>✕</span>
            <span>Deseleccionar</span>
          </button>
          <button className="quick-action-btn" onClick={onClose}>
            <span>🚪</span>
            <span>Cerrar Editor</span>
          </button>
        </div>
      </div>
    </div>
  );
}
