'use client';
import { useState, useEffect, useRef } from "react";

export default function EditableText({ 
  text, 
  tag = "p", 
  isEditing, 
  onSave, 
  className = "",
  placeholder = "Escribe aquí...",
  onSelect,
  isSelected = false,
  isEditingThisElement = false,
  elementId,
  styles = {},
  onStartEdit
}) {
  const [value, setValue] = useState(text);
  const [originalValue, setOriginalValue] = useState(text);
  const [localStyles, setLocalStyles] = useState(styles);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const Tag = tag;

  useEffect(() => {
    setValue(text);
    setOriginalValue(text);
  }, [text]);

  useEffect(() => {
    setLocalStyles(styles);
  }, [styles]);

  useEffect(() => {
    if (isEditingThisElement && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, value.length);
      if (tag === "textarea") adjustTextareaHeight();
    }
  }, [isEditingThisElement]);

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + 'px';
    }
  };

  const handleSelect = (e) => {
    if (isEditing && !isEditingThisElement) {
      e.stopPropagation();
      onSelect?.({ type: "text", id: elementId, text: value, element: tag, styles: localStyles });
      onStartEdit?.(elementId);
    }
  };

  const handleBlur = () => {
    if (isEditingThisElement) handleSave();
  };

  const handleKeyDown = (e) => {
    if (!isEditingThisElement) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') handleCancel();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (tag === "textarea") adjustTextareaHeight();
  };

  const handleSave = () => {
    onStartEdit?.(null);
    const finalValue = value.trim() === "" ? originalValue : value;
    if (onSave && finalValue !== originalValue) {
      onSave(finalValue);
      setOriginalValue(finalValue);
    }
  };

  const handleCancel = () => {
    onStartEdit?.(null);
    setValue(originalValue);
  };

  const applyStyles = () => {
    let styleClasses = '';
    if (localStyles.bold) styleClasses += 'font-bold ';
    if (localStyles.italic) styleClasses += 'italic ';
    if (localStyles.underline) styleClasses += 'underline ';
    switch (localStyles.fontSize) {
      case 'small': styleClasses += 'text-sm '; break;
      case 'large': styleClasses += 'text-lg '; break;
      case 'xlarge': styleClasses += 'text-xl '; break;
      default: styleClasses += 'text-base ';
    }
    switch (localStyles.align) {
      case 'center': styleClasses += 'text-center '; break;
      case 'right': styleClasses += 'text-right '; break;
      default: styleClasses += 'text-left ';
    }
    return styleClasses;
  };

  if (isEditingThisElement) {
    return (
      <div ref={containerRef} className={`editable-container editing ${className}`} onClick={handleSelect}>
        <textarea
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`edit-textarea ${applyStyles()} p-2 rounded w-full resize-none`}
          style={{ minHeight: "44px", maxHeight: "200px", color: localStyles?.color || 'inherit' }}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex gap-2 mt-1">
          <button onClick={handleSave} className="px-2 py-1 bg-green-500 text-white rounded">✓</button>
          <button onClick={handleCancel} className="px-2 py-1 bg-red-500 text-white rounded">✕</button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div ref={containerRef} className={`editable-container ${isSelected ? 'selected' : 'editable-hover'} ${className}`} onClick={handleSelect}>
        <Tag
          className={`${applyStyles()} break-words whitespace-normal p-2 min-h-[44px] transition-all ${
            value === placeholder ? 'text-gray-400 italic' : ''
          }`}
          style={{ color: localStyles?.color || 'inherit', cursor: 'pointer' }}
        >
          {value || placeholder}
        </Tag>
      </div>
    );
  }

  return (
    <Tag className={`${className} ${applyStyles()} break-words whitespace-normal ${
      value === placeholder ? 'text-gray-400 italic' : ''
    }`} style={{ color: localStyles?.color || 'inherit' }}>
      {value || text}
    </Tag>
  );
}
