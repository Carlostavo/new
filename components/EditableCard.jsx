'use client';
import { useState, useRef } from "react";
import Link from "next/link";

function SimpleEditableText({ 
  text, 
  isEditing, 
  onSave,
  className = "",
  multiline = false,
  placeholder = "Escribe aquí..."
}) {
  const [value, setValue] = useState(text);
  const [isEditingLocal, setIsEditingLocal] = useState(false);
  const [originalValue, setOriginalValue] = useState(text);
  const inputRef = useRef(null);

  const handleBlur = () => {
    handleSave();
  };

  const handleClick = () => {
    if (isEditing && !isEditingLocal) {
      setIsEditingLocal(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (inputRef.current && multiline) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 150) + 'px';
    }
  };

  const handleSave = () => {
    setIsEditingLocal(false);
    const finalValue = value.trim() === "" ? originalValue : value;
    
    if (onSave && finalValue !== originalValue) {
      onSave(finalValue);
      setOriginalValue(finalValue);
    }
  };

  const handleCancel = () => {
    setIsEditingLocal(false);
    setValue(originalValue);
  };

  if (isEditing && isEditingLocal) {
    if (multiline) {
      return (
        <div className="relative editable-element editing">
          <textarea
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`${className} w-full resize-none overflow-hidden break-words whitespace-normal contain-text bg-transparent outline-none rounded-lg p-2`}
            style={{
              minHeight: '60px',
              maxHeight: '150px',
              height: 'auto'
            }}
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="edit-btn edit-btn-save" title="Guardar">✓</button>
            <button onClick={handleCancel} className="edit-btn edit-btn-cancel" title="Cancelar">✕</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative editable-element editing">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`${className} w-full break-words whitespace-normal contain-text bg-transparent outline-none rounded-lg p-2`}
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="edit-btn edit-btn-save" title="Guardar">✓</button>
            <button onClick={handleCancel} className="edit-btn edit-btn-cancel" title="Cancelar">✕</button>
          </div>
        </div>
      );
    }
  }

  if (isEditing) {
    return (
      <div
        onClick={handleClick}
        onDoubleClick={handleClick}
        className={`${className} editable-element edit-ready edit-tooltip break-words whitespace-normal overflow-hidden text-contain rounded-lg p-2 min-h-[44px] flex items-center smooth-transition card-editable ${
          value === placeholder ? 'text-gray-400 italic' : ''
        }`}
      >
        {value || placeholder}
      </div>
    );
  }

  return (
    <div className={`${className} break-words whitespace-normal overflow-hidden text-contain ${
      value === placeholder ? 'text-gray-400 italic' : ''
    }`}>
      {value || text}
    </div>
  );
}

export default function EditableCard({ 
  title, 
  description, 
  link, 
  bgColor = "bg-white", 
  borderColor = "border-gray-200",
  isEditing, 
  onSave 
}) {
  const handleTitleSave = (newTitle) => {
    if (onSave) onSave({ type: 'title', value: newTitle });
  };

  const handleDescriptionSave = (newDescription) => {
    if (onSave) onSave({ type: 'description', value: newDescription });
  };

  const CardContent = () => (
    <div className={`p-4 rounded-lg border-2 ${borderColor} ${bgColor} shadow-sm hover:shadow-md transition-all duration-300 min-h-[160px] flex flex-col overflow-hidden w-full smooth-transition ${
      isEditing ? 'card-editable edit-mode edit-pulse' : ''
    }`}>
      <div className="mb-3 min-h-[52px] flex items-start overflow-hidden">
        <SimpleEditableText
          text={title}
          isEditing={isEditing}
          onSave={handleTitleSave}
          className="text-lg font-semibold text-gray-800 w-full line-clamp-2"
          multiline={false}
          placeholder="Título de la tarjeta..."
        />
      </div>
      
      <div className="flex-grow min-h-[68px] overflow-hidden">
        <SimpleEditableText
          text={description}
          isEditing={isEditing}
          onSave={handleDescriptionSave}
          className="text-sm text-gray-600 w-full line-clamp-3"
          multiline={true}
          placeholder="Descripción de la tarjeta..."
        />
      </div>
      
      {!isEditing && link && (
        <div className="mt-3 pt-2 border-t border-gray-200">
          <span className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
            Ver más →
          </span>
        </div>
      )}
    </div>
  );

  if (isEditing || !link) {
    return <CardContent />;
  }

  return (
    <Link href={link} className="block w-full smooth-transition">
      <CardContent />
    </Link>
  );
}
