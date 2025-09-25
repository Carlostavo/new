'use client';
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

function SimpleEditableText({ 
  text, 
  isEditing, 
  onSave,
  className = "",
  multiline = false,
  placeholder = "Escribe aquí...",
  onSelect,
  isSelected = false,
  isEditingThisElement = false,
  elementId,
  styles = {},
  onStartEdit
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
      if (multiline) {
        inputRef.current.style.height = "auto";
        inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 150) + "px";
      }
    }
  }, [isEditingThisElement]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (multiline && inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 150) + "px";
    }
  };

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
      case "small": styleClasses += "text-sm "; break;
      case "large": styleClasses += "text-lg "; break;
      case "xlarge": styleClasses += "text-xl "; break;
      default: styleClasses += "text-base ";
    }
    switch (localStyles.align) {
      case "center": styleClasses += "text-center "; break;
      case "right": styleClasses += "text-right "; break;
      default: styleClasses += "text-left ";
    }
    return styleClasses;
  };

  if (isEditingThisElement) {
    const InputComponent = multiline ? "textarea" : "input";
    return (
      <div className={`editable-container editing ${className}`}>
        <InputComponent
          ref={inputRef}
          type={!multiline ? "text" : undefined}
          value={value}
          onChange={handleChange}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !multiline) {
              e.preventDefault();
              handleSave();
            }
            if (e.key === "Escape") handleCancel();
          }}
          placeholder={placeholder}
          className={`edit-input ${applyStyles()} p-2 rounded w-full`}
          style={{ color: localStyles?.color || "inherit" }}
        />
        <div className="flex gap-2 mt-2">
          <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded">✓</button>
          <button onClick={handleCancel} className="bg-red-500 text-white px-2 py-1 rounded">✕</button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => {
        if (isEditing) {
          onSelect?.({
            type: multiline ? "description" : "title",
            id: elementId,
            text: value,
            styles: localStyles
          });
          onStartEdit?.(elementId);
        }
      }}
      className={`p-4 rounded-xl border-2 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col gap-3 w-full ${
        isSelected ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <SimpleEditableText
        text={text}
        isEditing={isEditing}
        onSave={(val) => onSave?.({ type: "title", value: val, cardId: elementId })}
        onSelect={onSelect}
        isEditingThisElement={isEditingThisElement}
        elementId={`${elementId}-title`}
        styles={styles}
        onStartEdit={onStartEdit}
        className="text-lg font-semibold"
        multiline={false}
        placeholder="Título..."
      />
      
      <SimpleEditableText
        text={text}
        isEditing={isEditing}
        onSave={(val) => onSave?.({ type: "description", value: val, cardId: elementId })}
        onSelect={onSelect}
        isEditingThisElement={isEditingThisElement}
        elementId={`${elementId}-description`}
        styles={styles}
        onStartEdit={onStartEdit}
        className="text-sm text-gray-600"
        multiline={true}
        placeholder="Descripción..."
      />

      {!isEditing && (
        <Link href="#" className="text-blue-600 hover:underline text-sm mt-2">
          Ver más →
        </Link>
      )}
    </div>
  );
}

export default SimpleEditableText;
