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
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(text);
  }, [text]);

  useEffect(() => {
    if (isEditingLocal && inputRef.current) {
      inputRef.current.focus();
      adjustTextareaHeight();
    }
  }, [isEditingLocal]);

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
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
    adjustTextareaHeight();
  };

  const Tag = tag;

  if (isEditing && isEditingLocal) {
    return (
      <textarea
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} border border-dashed border-blue-400 p-2 rounded bg-blue-50 outline-none focus:border-blue-600 w-full resize-none overflow-hidden break-words whitespace-normal contain-text`}
        style={{
          minHeight: '40px',
          maxHeight: '120px',
          height: 'auto'
        }}
      />
    );
  }

  if (isEditing) {
    return (
      <Tag
        onClick={handleClick}
        className={`${className} border border-dashed border-transparent p-2 rounded hover:border-gray-300 cursor-pointer break-words whitespace-normal overflow-hidden text-contain`}
      >
        {value}
      </Tag>
    );
  }

  return (
    <Tag className={`${className} break-words whitespace-normal overflow-hidden text-contain`}>
      {value}
    </Tag>
  );
}
