'use client';
import { useState, useEffect, useRef } from "react";

export default function EditableText({ 
  text, 
  tag = "p", 
  isEditing, 
  onSave, 
  className = "" 
}) {
  const [value, setValue] = useState(text);
  const [isEditingLocal, setIsEditingLocal] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    setValue(text);
  }, [text]);

  useEffect(() => {
    if (isEditingLocal && elementRef.current) {
      elementRef.current.focus();
      // Seleccionar todo el texto para edición
      const range = document.createRange();
      range.selectNodeContents(elementRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [isEditingLocal]);

  const handleBlur = () => {
    setIsEditingLocal(false);
    if (onSave && value !== text) {
      onSave(value);
    }
  };

  const handleClick = () => {
    if (isEditing && !isEditingLocal) {
      setIsEditingLocal(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setValue(text);
      setIsEditingLocal(false);
    }
  };

  const handleInput = (e) => {
    setValue(e.currentTarget.textContent);
  };

  const Tag = tag;

  if (isEditing) {
    return (
      <Tag
        ref={elementRef}
        contentEditable={isEditingLocal}
        suppressContentEditableWarning={true}
        onInput={handleInput}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        className={`${className} ${isEditingLocal 
          ? 'border border-dashed border-blue-400 p-2 rounded bg-blue-50 outline-none focus:border-blue-600 cursor-text' 
          : 'border border-dashed border-transparent p-2 rounded hover:border-gray-300 cursor-pointer'}`}
      >
        {value}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {value}
    </Tag>
  );
}
