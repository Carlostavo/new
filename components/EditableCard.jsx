'use client';
import { useState, useRef } from "react";
import Link from "next/link";

function SimpleEditableText({ 
  text, 
  isEditing, 
  onSave,
  className = "",
  multiline = false,
  placeholder = "Escribe aquí...",
  onEditStart,
  currentStyles
}) {
  const [value, setValue] = useState(text);
  const [isEditingLocal, setIsEditingLocal] = useState(false);
  const [originalValue, setOriginalValue] = useState(text);
  const inputRef = useRef(null);

  const handleBlur = () => {
    handleSave();
  };

  const handleClick = () => {
    if (isEditing && !isEditingLocal) {
      setIsEditingLocal(true);
      if (onEditStart) onEditStart();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (inputRef.current && multiline) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 150) + 'px';
    }
  };

  const handleSave = () => {
    setIsEditingLocal(false);
    const finalValue = value.trim() === "" ? originalValue : value;
    
    if (onSave && finalValue !== originalValue) {
      onSave(finalValue);
      setOriginalValue(finalValue);
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
      case 'xlarge': styleClasses += 'text-xl '; break;
      default: styleClasses += 'text-base ';
    }

    switch (currentStyles.align) {
      case 'center': styleClasses += 'text-center '; break;
      case 'right': styleClasses += 'text-right '; break;
      default: styleClasses += 'text-left ';
    }

    return styleClasses;
  };

  if (isEditing && isEditingLocal) {
    if (multiline) {
      return (
        <div className="relative editable-element editing">
          <textarea
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`${className} ${applyStyles()} w-full resize-none overflow-hidden break-words whitespace-normal contain-text bg-transparent outline-none rounded-lg p-2`}
            style={{
              minHeight: '60px',
              maxHeight: '150px',
              height: 'auto',
              color: currentStyles?.color || 'inherit'
            }}
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="edit-btn edit-btn-save" title="Guardar">✓</button>
            <button onClick={handleCancel} className="edit-btn edit-btn-cancel" title="Cancelar">✕</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative editable-element editing">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`${className} ${applyStyles()} w-full break-words whitespace-normal contain-text bg-transparent outline-none rounded-lg p-2`}
            style={{
              color: currentStyles?.color || 'inherit'
            }}
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="edit-btn edit-btn-save" title="Guardar">✓</button>
            <button onClick={handleCancel} className="edit-btn edit-btn-cancel" title="Cancelar">✕</button>
          </div>
        </div>
      );
    }
  }

  if (isEditing) {
    return (
      <div
        onClick={handleClick}
        onDoubleClick={handleClick}
        className={`${className} ${applyStyles()} editable-element edit-ready edit-tooltip break-words whitespace-normal overflow-hidden text-contain rounded-lg p-2 min-h-[44px] flex items-center smooth-transition card-editable ${
          value ===
