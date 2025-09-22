'use client';
import { useState, useRef } from "react";
import Link from "next/link";

// Componente mejorado que se ajusta al contenido
function SimpleEditableText({ 
  text, 
  isEditing, 
  onSave,
  className = "",
  multiline = false
}) {
  const [value, setValue] = useState(text);
  const [isEditingLocal, setIsEditingLocal] = useState(false);
  const inputRef = useRef(null);

  const handleBlur = () => {
    setIsEditingLocal(false);
    if (onSave && value !== text) {
      onSave(value);
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
    // Auto-ajustar altura
    if (inputRef.current && multiline) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  };

  if (isEditing && isEditingLocal) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${className} border border-dashed border-blue-400 p-2 rounded bg-blue-50 outline-none focus:border-blue-600 w-full resize-none overflow-hidden break-words`}
          style={{
            minHeight: '60px',
            height: 'auto'
          }}
          rows={3}
        />
      );
    } else {
      return (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${className} border border-dashed border-blue-400 p-2 rounded bg-blue-50 outline-none focus:border-blue-600 w-full break-words`}
        />
      );
    }
  }

  if (isEditing) {
    return (
      <div
        onClick={handleClick}
        className={`${className} border border-dashed border-transparent p-2 rounded hover:border-gray-300 cursor-pointer break-words min-h-[40px] flex items-center`}
      >
        {value}
      </div>
    );
  }

  return (
    <div className={`${className} break-words`}>
      {value}
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
    <div className={`p-4 rounded-lg border-2 ${borderColor} ${bgColor} shadow-sm hover:shadow-md transition-shadow duration-300 h-auto min-h-[120px] flex flex-col`}>
      {/* Título - una línea */}
      <div className="mb-2">
        <SimpleEditableText
          text={title}
          isEditing={isEditing}
          onSave={handleTitleSave}
          className="text-lg font-semibold text-gray-800"
          multiline={false}
        />
      </div>
      
      {/* Descripción - múltiples líneas */}
      <div className="flex-grow">
        <SimpleEditableText
          text={description}
          isEditing={isEditing}
          onSave={handleDescriptionSave}
          className="text-sm text-gray-600"
          multiline={true}
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
    <Link href={link} className="block h-full">
      <CardContent />
    </Link>
  );
}
