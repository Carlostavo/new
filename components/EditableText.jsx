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
  const [isActive, setIsActive] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const startEditing = () => {
    if (isEditing && !isActive) {
      setIsActive(true);
      setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.focus();
          // Mover cursor al final
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(elementRef.current);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }, 0);
    }
  };

  const stopEditing = () => {
    if (isActive) {
      setIsActive(false);
      if (onSave && value !== text) {
        onSave(value);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      stopEditing();
    }
    if (e.key === 'Escape') {
      setValue(text);
      stopEditing();
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
        contentEditable={isActive}
        suppressContentEditableWarning={true}
        onInput={handleInput}
        onBlur={stopEditing}
        onKeyDown={handleKeyDown}
        onClick={startEditing}
        className={`${className} border border-dashed p-2 rounded min-h-[1.5em] ${
          isActive 
            ? 'border-blue-500 bg-blue-50 outline-none' 
            : 'border-gray-300 hover:border-blue-300 cursor-pointer'
        }`}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  return (
    <Tag className={className}>
      {value}
    </Tag>
  );
}
