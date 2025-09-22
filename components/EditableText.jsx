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

  // Cuando se activa el modo edición, preparar el elemento para editar
  useEffect(() => {
    if (isEditing && !isEditingLocal) {
      // Solo mostrar el borde indicador, no activar edición aún
      setIsEditingLocal(false);
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isEditing && !isEditingLocal) {
      setIsEditingLocal(true);
      // Usar timeout para asegurar que el DOM esté listo
      setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.focus();
          // Mover el cursor al final del texto
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(elementRef.current);
          range.collapse(false); // false = al final
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }, 10);
    }
  };

  const handleBlur = () => {
    if (isEditingLocal) {
      setIsEditingLocal(false);
      if (onSave && value !== text) {
        onSave(value);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setValue(text);
      handleBlur();
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
          : 'border border-dashed border-gray-300 p-2 rounded hover:border-blue-300 cursor-pointer bg-white'}`}
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
