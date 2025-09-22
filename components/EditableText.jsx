'use client';
import { useState, useEffect } from "react";

export default function EditableText({ 
  text, 
  tag = "p", 
  isEditing, 
  onSave, 
  className = "" 
}) {
  const [value, setValue] = useState(text);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const handleBlur = () => {
    if (onSave && value !== text) {
      onSave(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const Tag = tag;

  if (isEditing) {
    return (
      <Tag
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={(e) => setValue(e.currentTarget.textContent)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} border border-dashed border-blue-400 p-2 rounded min-h-[1.5em] outline-none focus:border-blue-600`}
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
