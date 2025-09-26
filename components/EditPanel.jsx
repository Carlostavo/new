'use client';
import { useState, useEffect } from 'react';

export default function EditPanel({ isOpen, onClose, onStyleChange, currentElement }) {
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
    { label: 'Pequeño', value: 'small' },
    { label: 'Mediano', value: 'medium' },
    { label: 'Grande', value: 'large' },
    { label: 'Extra', value: 'xlarge' }
  ];

  const alignments = [
    { label: 'Izquierda', value: 'left', icon: '⫷' },
    { label: 'Centro', value: 'center', icon: '⫸' },
    { label: 'Derecha', value: 'right', icon: '⫹' }
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

  const applyStylesToText = () => {
    let styleString = '';
    
    if (activeStyles.bold) styleString += 'font-bold ';
    if (activeStyles.italic) styleString += 'italic ';
    if (activeStyles.underline) styleString += 'underline ';
    
    switch (activeStyles.fontSize) {
      case 'small': styleString += 'text-sm '; break;
      case 'large': styleString += 'text-lg '; break;
      case 'xlarge': styleString += 'text-xl '; break;
      default: styleString += 'text-base ';
    }

    switch (activeStyles.align) {
      case 'center': styleString += 'text-center '; break;
      case 'right': styleString += 'text-right '; break;
      default: styleString += 'text-left ';
    }

    return styleString;
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="edit-panel-overlay open" onClick={onClose} />
      
      <div className="edit-panel open">
        <div className="edit-panel-header">
          <h2 className="text-lg font-semibold">Editor Profesional</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="edit-panel-content">
          {/* Estilos de texto */}
          <div className="edit-panel-section">
            <h3>Estilos de Texto</h3>
            <div className="style-controls">
              <button
                className={`style-button ${activeStyles.bold ? 'active' : ''}`}
                onClick={() => handleStyleToggle('bold', !activeStyles.bold)}
              >
                <span className="font-bold">B</span>
                <span>Negrita</span>
              </button>
              
              <button
                className={`style-button ${activeStyles.italic ? 'active' : ''}`}
                onClick={() => handleStyleToggle('italic', !activeStyles.italic)}
              >
                <span className="italic">I</span>
                <span>Cursiva</span>
              </button>
              
              <button
                className={`style-button ${activeStyles.underline ? 'active' : ''}`}
                onClick={() => handleStyleToggle('underline', !activeStyles.underline)}
              >
                <span className="underline">U</span>
                <span>Subrayado</span>
              </button>
            </div>
          </div>

          {/* Tamaño de fuente */}
          <div className="edit-panel-section">
            <h3>Tamaño de Fuente</h3>
            <div className="font-size-controls">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  className={`font-size-btn ${activeStyles.fontSize === size.value ? 'active' : ''}`}
                  onClick={() => handleFontSizeSelect(size.value)}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color de texto */}
          <div className="edit-panel-section">
            <h3>Color de Texto</h3>
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
            <h3>Alineación</h3>
            <div className="text-align-controls">
              {alignments.map((align) => (
                <button
                  key={align.value}
                  className={`text-align-btn ${activeStyles.align === align.value ? 'active' : ''}`}
                  onClick={() => handleAlignSelect(align.value)}
                  title={align.label}
                >
                  {align.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Controles avanzados */}
          <div className="edit-panel-section">
            <h3>Controles Avanzados</h3>
            <div className="advanced-text-controls">
              <button className="advanced-btn">
                <span>📊</span>
                <span>Insertar Tabla</span>
              </button>
              <button className="advanced-btn">
                <span>📷</span>
                <span>Agregar Imagen</span>
              </button>
              <button className="advanced-btn">
                <span>🔗</span>
                <span>Insertar Enlace</span>
              </button>
              <button className="advanced-btn">
                <span>📋</span>
                <span>Plantillas</span>
              </button>
            </div>
          </div>

          {/* Vista previa */}
          <div className="edit-panel-section">
            <h3>Vista Previa</h3>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <p className={applyStylesToText()}>
                Texto de ejemplo con los estilos aplicados
              </p>
            </div>
          </div>

          {/* Acciones */}
          <div className="edit-panel-section">
            <div className="flex gap-3">
              <button className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                Resetear
              </button>
              <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
