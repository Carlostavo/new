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
  const [inputWidth, setInputWidth] = useState('auto');
  const [inputHeight, setInputHeight] = useState('auto');
  const inputRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    setValue(text);
  }, [text]);

  useEffect(() => {
    if (isEditingLocal && inputRef.current) {
      inputRef.current.focus();
      
      // Ajustar tamaño basado en el contenido
      adjustInputSize();
    }
  }, [isEditingLocal, value]);

  // Función para ajustar el tamaño del input al contenido
  const adjustInputSize = () => {
    if (spanRef.current && inputRef.current) {
      // Usar un span invisible para medir el texto
      spanRef.current.textContent = value || ' ';
      const width = Math.max(spanRef.current.offsetWidth + 20, 100);
      const height = Math.max(spanRef.current.offsetHeight + 10, 40);
      
      setInputWidth(`${width}px`);
      setInputHeight(`${height}px`);
    }
  };

  const handleBlur = () => {
    setIsEditingLocal(false);
    if (onSave && value !== text && value.trim() !== "") {
      onSave(value);
    } else if (value.trim() === "") {
      setValue(text);
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

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const Tag = tag;

  if (isEditing && isEditingLocal) {
    return (
      <>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={{
            width: inputWidth,
            height: inputHeight,
            minWidth: '100px',
            minHeight: '40px'
          }}
          className={`${className} border border-dashed border-blue-400 p-2 rounded bg-blue-50 outline-none focus:border-blue-600 resize-none overflow-hidden`}
        />
        {/* Span invisible para medir el texto */}
        <span
          ref={spanRef}
          className="absolute invisible whitespace-pre-wrap break-words"
          style={{
            font: 'inherit',
            padding: '8px',
            maxWidth: '300px'
          }}
        >
          {value}
        </span>
      </>
    );
  }

  if (isEditing) {
    return (
      <Tag
        onClick={handleClick}
        className={`${className} border border-dashed border-transparent p-2 rounded hover:border-gray-300 cursor-pointer break-words min-h-[40px] flex items-center`}
      >
        {value}
      </Tag>
    );
  }

  return (
    <Tag className={`${className} break-words`}>
      {value}
    </Tag>
  );
}
