'use client';
import { useState, useEffect, useRef } from "react";

export default function EditableText({ 
  text, 
  tag = "p", 
  isEditing, 
  onSave, 
  className = "",
  placeholder = "Escribe aquí...",
  onElementSelect,
  isSelected,
  currentStyles
}) {
  const [value, setValue] = useState(text);
  const [isEditingLocal, setIsEditingLocal] = useState(false);
  const [originalValue, setOriginalValue] = useState(text);
  const elementRef = useRef(null);

  useEffect(() => {
    setValue(text);
    setOriginalValue(text);
  }, [text]);

  useEffect(() => {
    if (isEditingLocal && elementRef.current) {
      const textarea = elementRef.current.querySelector('textarea');
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(value.length, value.length);
        adjustTextareaHeight(textarea);
      }
    }
  }, [isEditingLocal]);

  const adjustTextareaHeight = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  const handleElementClick = (e) => {
    if (isEditing && !isEditingLocal) {
      e.stopPropagation();
      if (onElementSelect) {
        onElementSelect({
          element: elementRef.current,
          text: value,
          type: tag
        });
      }
    }
  };

  const handleTextClick = () => {
    if (isSelected && !isEditingLocal) {
      setIsEditingLocal(true);
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const handleSave = () => {
    setIsEditingLocal(false);
    const finalValue = value.trim() === "" ? originalValue : value;
    
    if (onSave && finalValue !== originalValue) {
      onSave(finalValue);
      setOriginalValue(finalValue);
    } else if (finalValue !== value) {
      setValue(finalValue);
    }
  };

  const handleCancel = () => {
    setIsEditingLocal(false);
    setValue(originalValue);
  };

  // Aplicar estilos desde el panel
  const applyStyles = () => {
    if (!currentStyles) return '';
    
    let styleClasses = '';
    
    if (currentStyles.bold) styleClasses += 'font-bold ';
    if (currentStyles.italic) styleClasses += 'italic ';
    if (currentStyles.underline) styleClasses += 'underline ';
    
    switch (currentStyles.fontSize) {
      case 'small': styleClasses += 'text-sm '; break;
      case 'large': styleClasses += 'text-lg '; break;
      default: styleClasses += 'text-base ';
    }

    return styleClasses;
  };

  const Tag = tag;

  if (isEditing && isEditingLocal) {
    return (
      <div 
        ref={elementRef}
        className={`relative editable-element editing ${isSelected ? 'selected' : ''}`}
      >
        {isSelected && <div className="selected-element-indicator">Editando</div>}
        <textarea
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`${className} ${applyStyles()} w-full resize-none overflow-hidden break-words whitespace-normal contain-text bg-transparent outline-none rounded-lg p-3 editing-cursor`}
          style={{
            minHeight: '44px',
            maxHeight: '200px',
            height: 'auto',
            color: currentStyles?.color || 'inherit'
          }}
        />
        <div className="edit-actions">
          <button 
            onClick={handleSave}
            className="edit-btn edit-btn-save"
            title="Guardar (Enter)"
          >
            ✓
          </button>
          <button 
            onClick={handleCancel}
            className="edit-btn edit-btn-cancel"
            title="Cancelar (Esc)"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={elementRef}
      onClick={handleElementClick}
      className={`element-highlight ${isSelected ? 'selected' : ''} ${isEditing ? 'cursor-pointer' : ''} smooth-transition`}
    >
      {isSelected && <div className="selected-element-indicator">Seleccionado</div>}
      <Tag
        onClick={handleTextClick}
        className={`${className} ${applyStyles()} break-words whitespace-normal overflow-hidden text-contain rounded-lg p-3 min-h-[44px] flex items-center ${
          value === placeholder ? 'text-gray-400 italic' : ''
        } ${isEditing ? 'edit-tooltip' : ''}`}
        style={{
          color: currentStyles?.color || 'inherit'
        }}
      >
        {value || placeholder}
      </Tag>
    </div>
  );
}
