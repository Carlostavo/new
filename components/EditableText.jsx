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
      inputRef.current.setSelectionRange(value.length, value.length);
    }
  }, [isEditingLocal]);

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
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} border border-dashed border-blue-400 p-2 rounded bg-blue-50 outline-none focus:border-blue-600 w-full break-words`}
      />
    );
  }

  if (isEditing) {
    return (
      <Tag
        onClick={handleClick}
        className={`${className} border border-dashed border-transparent p-2 rounded hover:border-gray-300 cursor-pointer break-words`}
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
