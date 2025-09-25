'use client';
import { useState, useEffect, useRef } from "react";

export default function EditableText({
  text,
  isEditing,
  onSave,
  tag = "p",
  className = "",
  placeholder = "Escribe aquí...",
  onSelect,
  isSelected = false,
  isEditingThisElement = false,
  elementId,
  styles = {},
  onStartEdit,
}) {
  const [value, setValue] = useState(text);
  const [originalValue, setOriginalValue] = useState(text);
  const [localStyles, setLocalStyles] = useState(styles);
  const inputRef = useRef(null);

  useEffect(() => setValue(text), [text]);
  useEffect(() => setLocalStyles(styles), [styles]);

  useEffect(() => {
    if (isEditingThisElement && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, value.length);
    }
  }, [isEditingThisElement]);

  const handleSave = () => {
    onStartEdit?.(null);
    const finalValue = value.trim() === "" ? originalValue : value;
    if (onSave && finalValue !== originalValue) {
      onSave(finalValue);
      setOriginalValue(finalValue);
    }
  };

  const handleCancel = () => {
    onStartEdit?.(null);
    setValue(originalValue);
  };

  const applyStyles = () => {
    let styleClasses = "";
    if (localStyles.bold) styleClasses += "font-bold ";
    if (localStyles.italic) styleClasses += "italic ";
    if (localStyles.underline) styleClasses += "underline ";
    switch (localStyles.fontSize) {
      case "small":
        styleClasses += "text-sm ";
        break;
      case "large":
        styleClasses += "text-lg ";
        break;
      case "xlarge":
        styleClasses += "text-xl ";
        break;
      default:
        styleClasses += "text-base ";
    }
    switch (localStyles.align) {
      case "center":
        styleClasses += "text-center ";
        break;
      case "right":
        styleClasses += "text-right ";
        break;
      default:
        styleClasses += "text-left ";
    }
    return styleClasses;
  };

  if (isEditingThisElement) {
    return (
      <div className="editable-container editing w-full">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
          placeholder={placeholder}
          className={`edit-input ${applyStyles()} p-2 rounded w-full`}
          style={{ color: localStyles?.color || "inherit" }}
        />
      </div>
    );
  }

  const Tag = tag;
  return (
    <Tag
      onClick={() => {
        if (isEditing) {
          onSelect?.({
            type: "text",
            id: elementId,
            text: value,
            styles: localStyles,
          });
          onStartEdit?.(elementId);
        }
      }}
      className={`${className} ${applyStyles()} ${
        isEditing ? "cursor-pointer hover:bg-gray-50" : ""
      } ${isSelected ? "ring-2 ring-blue-400" : ""}`}
      style={{ color: localStyles?.color || "inherit" }}
    >
      {value || placeholder}
    </Tag>
  );
}
