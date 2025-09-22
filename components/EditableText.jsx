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
  const [isEditingMode, setIsEditingMode] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const enableEditing = () => {
    if (isEditing && !isEditingMode) {
      setIsEditingMode(true);
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        if (ref.current) {
          ref.current.focus();
          // Colocar el cursor al final del texto
          const range = document.createRange();
          const sel = window.getSelection();
          range.selectNodeContents(ref.current);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }, 10);
    }
  };

  const disableEditing = () => {
    if (isEditingMode) {
      setIsEditingMode(false);
      if (onSave && value !== text) {
        onSave(value);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      disableEditing();
    }
  };

  const Tag = tag;

  if (isEditing) {
    return (
      <Tag
        ref={ref}
        contentEditable={isEditingMode}
        suppressContentEditableWarning={true}
        onBlur={disableEditing}
        onKeyDown={handleKeyDown}
        onClick={enableEditing}
        onInput={(e) => setValue(e.currentTarget.textContent)}
        className={`${className} ${isEditingMode 
          ? 'border-2 border-blue-500 p-2 rounded bg-blue-50 outline-none' 
          : 'border border-dashed border-gray-300 p-2 rounded hover:border-blue-300 cursor-pointer'}`}
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
