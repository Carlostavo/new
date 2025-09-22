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
  const lastCaretPosition = useRef(0);

  useEffect(() => {
    setValue(text);
  }, [text]);

  useEffect(() => {
    if (isEditing && !isEditingLocal && elementRef.current) {
      // Preparar el elemento para edición pero no iniciar aún
      elementRef.current.style.cursor = 'pointer';
    } else if (isEditingLocal && elementRef.current) {
      // Iniciar edición
      elementRef.current.style.cursor = 'text';
      elementRef.current.focus();
      
      // Restaurar la posición del cursor
      const selection = window.getSelection();
      const range = document.createRange();
      
      if (elementRef.current.childNodes[0]) {
        try {
          range.setStart(elementRef.current.childNodes[0], Math.min(lastCaretPosition.current, value.length));
          range.setEnd(elementRef.current.childNodes[0], Math.min(lastCaretPosition.current, value.length));
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (error) {
          // Fallback: colocar cursor al final
          range.selectNodeContents(elementRef.current);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  }, [isEditingLocal, isEditing, value.length]);

  const handleBlur = () => {
    // Guardar posición del cursor antes de salir
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && elementRef.current) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(elementRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      lastCaretPosition.current = preCaretRange.toString().length;
    }
    
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
    
    // Guardar posición actual del cursor durante la edición
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(e.currentTarget);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      lastCaretPosition.current = preCaretRange.toString().length;
    }
  };

  const handleFocus = () => {
    // Guardar posición inicial del cursor al enfocar
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && elementRef.current) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(elementRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      lastCaretPosition.current = preCaretRange.toString().length;
    }
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
        onFocus={handleFocus}
        className={`${className} ${isEditingLocal 
          ? 'border border-dashed border-blue-400 p-2 rounded bg-blue-50 outline-none focus:border-blue-600 cursor-text' 
          : 'border border-dashed border-transparent p-2 rounded hover:border-gray-300 cursor-pointer'}`}
        style={{ 
          userSelect: isEditingLocal ? 'text' : 'none',
          WebkitUserSelect: isEditingLocal ? 'text' : 'none'
        }}
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
