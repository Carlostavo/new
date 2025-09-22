'use client';
import { useState, useEffect } from 'react';

export default function EditPanel({ isOpen, onClose, currentElement, onSave }) {
  const [formData, setFormData] = useState({
    text: '',
    fontSize: '16',
    fontWeight: 'normal',
    color: '#000000',
    backgroundColor: 'transparent',
    alignment: 'left',
    padding: '8',
    borderRadius: '4'
  });

  useEffect(() => {
    if (currentElement) {
      setFormData({
        text: currentElement.text || '',
        fontSize: currentElement.fontSize || '16',
        fontWeight: currentElement.fontWeight || 'normal',
        color: currentElement.color || '#000000',
        backgroundColor: currentElement.backgroundColor || 'transparent',
        alignment: currentElement.alignment || 'left',
        padding: currentElement.padding || '8',
        borderRadius: currentElement.borderRadius || '4'
      });
    }
  }, [currentElement]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (onSave && currentElement) {
      onSave({
        ...currentElement,
        ...formData
      });
    }
    onClose();
  };

  const colorOptions = [
    '#000000', '#374151', '#6b7280', '#ef4444', '#f59e0b',
    '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'
  ];

  const fontWeightOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'semibold', label: 'Semibold' },
    { value: 'bold', label: 'Bold' }
  ];

  const alignmentOptions = [
    { value: 'left', label: 'Izquierda' },
    { value: 'center', label: 'Centro' },
    { value: 'right', label: 'Derecha' },
    { value: 'justify', label: 'Justificado' }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className={`edit-panel-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      
      <div className={`edit-panel ${isOpen ? 'open' : ''}`}>
        <div className="edit-panel-header">
          <h2 className="text-xl font-semibold">Editor Profesional</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="edit-panel-content">
          <div className="edit-panel-section">
            <h3>Contenido</h3>
            <div className="edit-control">
              <label>Texto</label>
              <textarea
                value={formData.text}
                onChange={(e) => handleInputChange('text', e.target.value)}
                placeholder="Escribe el contenido aquí..."
              />
            </div>
          </div>

          <div className="edit-panel-section">
            <h3>Tipografía</h3>
            <div className="edit-control">
              <label>Tamaño de fuente</label>
              <div className="font-size-control">
                <input
                  type="range"
                  min="12"
                  max="32"
                  value={formData.fontSize}
                  onChange={(e) => handleInputChange('fontSize', e.target.value)}
                />
                <span className="font-size-value">{formData.fontSize}px</span>
              </div>
            </div>

            <div className="edit-control">
              <label>Peso de fuente</label>
              <select
                value={formData.fontWeight}
                onChange={(e) => handleInputChange('fontWeight', e.target.value)}
              >
                {fontWeightOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="edit-panel-section">
            <h3>Colores</h3>
            <div className="edit-control">
              <label>Color del texto</label>
              <div className="color-palette">
                {colorOptions.map(color => (
                  <div
                    key={color}
                    className={`color-option ${formData.color === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleInputChange('color', color)}
                  />
                ))}
              </div>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="edit-control">
              <label>Color de fondo</label>
              <div className="color-palette">
                {['transparent', '#ffffff', '#f3f4f6', '#fef3c7', '#dbeafe'].map(color => (
                  <div
                    key={color}
                    className={`color-option ${formData.backgroundColor === color ? 'active' : ''}`}
                    style={{ 
                      backgroundColor: color,
                      border: color === 'transparent' ? '1px dashed #d1d5db' : 'none'
                    }}
                    onClick={() => handleInputChange('backgroundColor', color)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="edit-panel-section">
            <h3>Diseño</h3>
            <div className="edit-control">
              <label>Alineación</label>
              <select
                value={formData.alignment}
                onChange={(e) => handleInputChange('alignment', e.target.value)}
              >
                {alignmentOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="edit-control">
              <label>Espaciado interno</label>
              <input
                type="range"
                min="0"
                max="20"
                value={formData.padding}
                onChange={(e) => handleInputChange('padding', e.target.value)}
              />
              <span className="text-xs text-gray-500">{formData.padding}px</span>
            </div>

            <div className="edit-control">
              <label>Bordes redondeados</label>
              <input
                type="range"
                min="0"
                max="20"
                value={formData.borderRadius}
                onChange={(e) => handleInputChange('borderRadius', e.target.value)}
              />
              <span className="text-xs text-gray-500">{formData.borderRadius}px</span>
            </div>
          </div>
        </div>

        <div className="edit-panel-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Aplicar Cambios
          </button>
        </div>
      </div>
    </>
  );
}
