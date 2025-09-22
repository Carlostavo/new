'use client';
import { useState, useEffect, useRef } from "react";

export default function EditableText({ 
  text, 
  tag = "p", 
  isEditing, 
  onSave, 
  className = "",
  placeholder = "Escribe aquí..."
}) {
  const [value, setValue] = useState(text);
  const [isEditingLocal, setIsEditingLocal] = useState(false);
  const [originalValue, setOriginalValue] = useState(text);
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(text);
    setOriginalValue(text);
  }, [text]);

  useEffect(() => {
    if (isEditingLocal && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(value.length, value.length);
      adjustTextareaHeight();
    }
  }, [isEditingLocal]);

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + 'px';
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  const handleClick = () => {
    if (isEditing && !isEditingLocal) {
      setIsEditingLocal(true);
    }
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
    adjustTextareaHeight();
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

  const handleDoubleClick = () => {
    if (isEditing && !isEditingLocal) {
      setIsEditingLocal(true);
    }
  };

  const Tag = tag;

  if (isEditing && isEditingLocal) {
    return (
      <div className="relative editable-element editing">
        <textarea
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`${className} w-full resize-none overflow-hidden break-words whitespace-normal contain-text bg-transparent outline-none rounded-lg p-3`}
          style={{
            minHeight: '44px',
            maxHeight: '200px',
            height: 'auto'
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

  if (isEditing) {
    return (
      <Tag
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        className={`${className} editable-element edit-ready edit-tooltip break-words whitespace-normal overflow-hidden text-contain rounded-lg p-3 min-h-[44px] flex items-center smooth-transition ${
          value === placeholder ? 'text-gray-400 italic' : ''
        }`}
      >
        {value || placeholder}
      </Tag>
    );
  }

  return (
    <Tag className={`${className} break-words whitespace-normal overflow-hidden text-contain ${
      value === placeholder ? 'text-gray-400 italic' : ''
    }`}>
      {value || text}
    </Tag>
  );
}
