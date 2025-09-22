'use client';
import { useState, useEffect } from 'react';

export default function EditPanel({ 
  isOpen, 
  onClose, 
  onStyleChange, 
  activeElement,
  onApplyToAll 
}) {
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    color: '#000000',
    fontSize: 'medium',
    align: 'left'
  });

  const colors = [
    '#000000', '#374151', '#6b7280', '#ef4444', '#f59e0b',
    '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff'
  ];

  const fontSizes = [
    { label: 'S', value: 'small' },
    { label: 'M', value: 'medium' },
    { label: 'L', value: 'large' },
    { label: 'XL', value: 'xlarge' }
  ];

  const alignments = [
    { label: 'Izq', value: 'left', icon: '⫷' },
    { label: 'Cen', value: 'center', icon: '⫸' },
    { label: 'Der', value: 'right', icon: '⫹' }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
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

  const handleAlignSelect = (align) => {
    handleStyleToggle('align', align);
  };

  const handleReset = () => {
    const defaultStyles = {
      bold: false,
      italic: false,
      underline: false,
      color: '#000000',
      fontSize: 'medium',
      align: 'left'
    };
    setActiveStyles(defaultStyles);
    onStyleChange(defaultStyles);
  };

  const handleApplyToAll = () => {
    if (onApplyToAll) {
      onApplyToAll(activeStyles);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="edit-panel-overlay open" onClick={onClose} />
      
      <div className="edit-panel open">
        <div className="edit-panel-header">
          <div>
            <h2 className="text-sm font-semibold">Editor</h2>
            {activeElement && (
              <p className="text-xs opacity-90">{activeElement}</p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 text-lg"
          >
            ✕
          </button>
        </div>

        <div className="edit-panel-content">
          {/* Estilos de texto */}
          <div className="edit-panel-section">
            <h3>Estilos</h3>
            <div className="style-controls">
              <button
                className={`style-button ${activeStyles.bold ? 'active' : ''}`}
                onClick={() => handleStyleToggle('bold', !activeStyles.bold)}
                title="Negrita"
              >
                <span className="font-bold text-sm">B</span>
                <span>Negrita</span>
              </button>
              
              <button
                className={`style-button ${activeStyles.italic ? 'active' : ''}`}
                onClick={() => handleStyleToggle('italic', !activeStyles.italic)}
                title="Cursiva"
              >
                <span className="italic text-sm">I</span>
                <span>Cursiva</span>
              </button>
              
              <button
                className={`style-button ${activeStyles.underline ? 'active' : ''}`}
                onClick={() => handleStyleToggle('underline', !activeStyles.underline)}
                title="Subrayado"
              >
                <span className="underline text-sm">U</span>
                <span>Subrayado</span>
              </button>
            </div>
          </div>

          {/* Tamaño de fuente */}
          <div className="edit-panel-section">
            <h3>Tamaño</h3>
            <div className="font-size-controls">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  className={`font-size-btn ${activeStyles.fontSize === size.value ? 'active' : ''}`}
                  onClick={() => handleFontSizeSelect(size.value)}
                  title={size.value}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color de texto */}
          <div className="edit-panel-section">
            <h3>Color</h3>
            <div className="color-palette">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`color-option ${activeStyles.color === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Alineación */}
          <div className="edit-panel-section">
            <h3>Alinear</h3>
            <div className="text-align-controls">
              {alignments.map((align) => (
                <button
                  key={align.value}
                  className={`text-align-btn ${activeStyles.align === align.value ? 'active' : ''}`}
                  onClick={() => handleAlignSelect(align.value)}
                  title={align.value}
                >
                  {align.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="edit-panel-section">
            <div className="flex gap-2">
              <button 
                onClick={handleReset}
                className="flex-1 bg-gray-500 text-white py-2 px-3 rounded text-xs hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={handleApplyToAll}
                className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-xs hover:bg-green-700 transition-colors"
              >
                Aplicar a Todo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
