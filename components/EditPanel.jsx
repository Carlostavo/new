// components/EditPanel.jsx
'use client';
import { useState, useEffect } from 'react';

export default function EditPanel({ isOpen, onClose, selectedElement, onApplyStyles, onDeleteElement }) {
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    color: '#000000',
    fontSize: 'medium',
    align: 'left',
    bgColor: '#ffffff'
  });

  const colors = [
    '#000000', '#374151', '#6b7280', '#ef4444', '#f59e0b', '#10b981',
    '#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#84cc16', '#ffffff'
  ];

  const bgColors = [
    '#ffffff', '#f3f4f6', '#e5e7eb', '#fef2f2', '#fffbeb', '#f0fdf4',
    '#eff6ff', '#faf5ff', '#fdf2f8', '#fff7ed', '#f0fdf0', '#dbeafe'
  ];

  const fontSizes = [
    { label: 'Pequeño', value: 'small' },
    { label: 'Mediano', value: 'medium' },
    { label: 'Grande', value: 'large' },
    { label: 'Extra Grande', value: 'xlarge' }
  ];

  const alignments = [
    { label: 'Izquierda', value: 'left', icon: '⫷' },
    { label: 'Centro', value: 'center', icon: '⫸' },
    { label: 'Derecha', value: 'right', icon: '⫹' }
  ];

  useEffect(() => {
    if (selectedElement && selectedElement.styles) {
      setActiveStyles(selectedElement.styles);
    } else {
      setActiveStyles({
        bold: false,
        italic: false,
        underline: false,
        color: '#000000',
        fontSize: 'medium',
        align: 'left',
        bgColor: '#ffffff'
      });
    }
  }, [selectedElement]);

  const handleStyleToggle = (style, value) => {
    const newStyles = {
      ...activeStyles,
      [style]: value
    };
    setActiveStyles(newStyles);
  };

  const handleColorSelect = (color) => {
    handleStyleToggle('color', color);
  };

  const handleBgColorSelect = (color) => {
    handleStyleToggle('bgColor', color);
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

  const resetStyles = () => {
    const defaultStyles = {
      bold: false,
      italic: false,
      underline: false,
      color: '#000000',
      fontSize: 'medium',
      align: 'left',
      bgColor: '#ffffff'
    };
    setActiveStyles(defaultStyles);
  };

  const handleApplyStyles = () => {
    if (onApplyStyles && selectedElement) {
      onApplyStyles(selectedElement.id, activeStyles);
    }
  };

  const handleDeleteElement = () => {
    if (onDeleteElement && selectedElement && confirm('¿Estás seguro de eliminar este elemento?')) {
      onDeleteElement(selectedElement.id);
    }
  };

  return (
    <div className={`edit-panel-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="edit-panel-header">
        <div>
          <h2 className="text-sm font-semibold">Editor Avanzado</h2>
          <p className="text-xs opacity-90">Control completo de estilos</p>
        </div>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 text-lg transition-transform hover:scale-110"
          title="Cerrar editor"
        >
          ✕
        </button>
      </div>

      <div className="edit-panel-content">
        {/* Elemento seleccionado */}
        <div className="edit-panel-section">
          <h3>Editando</h3>
          <div className="p-3 bg-gray-50 rounded-lg text-xs border">
            {selectedElement ? (
              <div>
                <div className="font-medium capitalize">{selectedElement.type}</div>
                <div className="text-gray-600 truncate">{selectedElement.text || 'Texto del elemento'}</div>
                <div className="mt-2 text-xs text-gray-500">ID: {selectedElement.id}</div>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-2">
                Selecciona un elemento para editarlo
              </div>
            )}
          </div>
        </div>

        {/* Estilos de texto */}
        <div className="edit-panel-section">
          <h3>Estilos de Texto</h3>
          <div className="compact-controls">
            <div className="flex gap-2 mb-2">
              <button
                className={`compact-button flex-1 ${activeStyles.bold ? 'active' : ''}`}
                onClick={() => handleStyleToggle('bold', !activeStyles.bold)}
              >
                <span className="font-bold">B</span>
                <span>Negrita</span>
              </button>
              <button
                className={`compact-button flex-1 ${activeStyles.italic ? 'active' : ''}`}
                onClick={() => handleStyleToggle('italic', !activeStyles.italic)}
              >
                <span className="italic">I</span>
                <span>Cursiva</span>
              </button>
              <button
                className={`compact-button flex-1 ${activeStyles.underline ? 'active' : ''}`}
                onClick={() => handleStyleToggle('underline', !activeStyles.underline)}
              >
                <span className="underline">U</span>
                <span>Subrayado</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tamaño de fuente */}
        <div className="edit-panel-section">
          <h3>Tamaño de Fuente</h3>
          <div className="font-size-controls-compact">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                className={`font-size-btn-compact ${activeStyles.fontSize === size.value ? 'active' : ''}`}
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
          <div className="color-palette-compact">
            {colors.map((color) => (
              <div
                key={color}
                className={`color-option-compact ${activeStyles.color === color ? 'active' : ''} ${
                  color === '#ffffff' ? 'border border-gray-300' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Color de fondo */}
        <div className="edit-panel-section">
          <h3>Color de Fondo</h3>
          <div className="color-palette-compact">
            {bgColors.map((color) => (
              <div
                key={color}
                className={`color-option-compact ${activeStyles.bgColor === color ? 'active' : ''} ${
                  color === '#ffffff' ? 'border border-gray-300' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleBgColorSelect(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Alineación */}
        <div className="edit-panel-section">
          <h3>Alineación</h3>
          <div className="text-align-controls-compact">
            {alignments.map((align) => (
              <button
                key={align.value}
                className={`text-align-btn-compact ${activeStyles.align === align.value ? 'active' : ''}`}
                onClick={() => handleAlignSelect(align.value)}
                title={align.label}
              >
                {align.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Vista previa */}
        <div className="edit-panel-section">
          <h3>Vista Previa</h3>
          <div 
            className="preview-compact rounded border"
            style={{ backgroundColor: activeStyles.bgColor }}
          >
            <p 
              className={applyStylesToText()}
              style={{ color: activeStyles.color }}
            >
              Texto de ejemplo con estilos aplicados
            </p>
          </div>
        </div>

        {/* Acciones */}
        <div className="action-buttons">
          <button 
            className="action-btn action-btn-secondary"
            onClick={resetStyles}
            disabled={!selectedElement}
          >
            ↺ Resetear Estilos
          </button>
          
          {selectedElement?.type === 'card' && (
            <button 
              className="action-btn bg-red-500 hover:bg-red-600 text-white"
              onClick={handleDeleteElement}
            >
              🗑 Eliminar Elemento
            </button>
          )}
          
          <button 
            className="action-btn action-btn-primary"
            onClick={handleApplyStyles}
            disabled={!selectedElement}
          >
            💾 Aplicar Estilos
          </button>
        </div>
      </div>
    </div>
  );
}
