'use client';
import { useState } from "react";

export default function EditableText({ text, tag = "p", isEditing, onSave }) {
  const [value, setValue] = useState(text);

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

  return (
    <Tag
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onInput={(e) => setValue(e.currentTarget.textContent)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={isEditing ? "border border-dashed border-blue-400 p-1 rounded min-h-[1.5em]" : ""}
    >
      {text}
    </Tag>
  );
}
