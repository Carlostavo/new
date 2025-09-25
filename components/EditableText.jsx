'use client';
import { useState, useEffect, useRef } from "react";

export default function EditableText({ 
  text, 
  tag = "p", 
  isEditing, 
  onSave, 
  className = "",
  placeholder = "Escribe aquí...",
  onSelect,
  isSelected = false,
  isEditingThisElement = false,
  elementId,
  styles = {},
  onStartEdit,
  onApplyStyles
}) {
  const [value, setValue] = useState(text);
  const [originalValue, setOriginalValue] = useState(text);
  const [localStyles, setLocalStyles] = useState(styles);
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(text);
    setOriginalValue(text);
  }, [text]);

  useEffect(() => {
    setLocalStyles(styles);
  }, [styles]);

  useEffect(() => {
    if (isEditingThisElement && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, value.length);
      adjustHeight();
    }
  }, [isEditingThisElement]);

  const adjustHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 250) + "px";
    }
  };

  const handleSave = () => {
    if (onStartEdit) onStartEdit(null);
    const finalValue = value.trim() === "" ? originalValue : value;
    if (onSave && finalValue !== originalValue) {
      onSave(finalValue);
      setOriginalValue(finalValue);
    }
  };

  const handleCancel = () => {
    if (onStartEdit) onStartEdit(null);
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

  const Tag = tag;

  if (isEditingThisElement) {
    return (
      <div className={`editable-container editing ${className}`}>
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => { setValue(e.target.value); adjustHeight(); }}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSave(); }
            if (e.key === "Escape") handleCancel();
          }}
          placeholder={placeholder}
          className={`edit-textarea ${applyStyles()} p-2 rounded w-full border`}
          style={{ color: localStyles?.color || "inherit", minHeight: "44px" }}
        />
        <div className="flex gap-2 mt-1">
          <button onClick={handleSave} className="px-2 py-1 bg-green-500 text-white rounded">Guardar</button>
          <button onClick={handleCancel} className="px-2 py-1 bg-red-500 text-white rounded">Cancelar</button>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div 
        className={`editable-container ${isSelected ? 'ring-2 ring-blue-400' : 'hover:ring'} ${className}`}
        onClick={(e) => { e.stopPropagation(); onSelect?.({ id: elementId, text: value, element: tag, styles: localStyles }); onStartEdit?.(elementId); }}
      >
        <Tag className={`${applyStyles()} p-2 transition-all`} style={{ color: localStyles?.color || "inherit" }}>
          {value || placeholder}
        </Tag>
      </div>
    );
  }

  return (
    <Tag className={`${className} ${applyStyles()}`} style={{ color: localStyles?.color || "inherit" }}>
      {value || text}
    </Tag>
  );
}
