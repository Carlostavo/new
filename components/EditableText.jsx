'use client';
import { useState } from "react";

export default function EditableText({ text, tag = "p", isEditing, onSave }) {
  const [value, setValue] = useState(text);

  const handleBlur = () => {
    if (onSave) onSave(value);
  };

  const Tag = tag; // permite usar h1, h2, p, etc.

  return (
    <Tag
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onInput={(e) => setValue(e.currentTarget.textContent)}
      onBlur={handleBlur}
      className={isEditing ? "border border-dashed border-blue-400 p-1 rounded" : ""}
    >
      {value}
    </Tag>
  );
}
