'use client';
import { useState, useRef } from "react";
import Link from "next/link";

function SimpleEditableText({ 
  text, 
  isEditing, 
  onSave,
  className = "",
  multiline = false,
  placeholder = "Escribe aquí...",
  onElementSelect,
  isSelected,
  currentStyles,
  fieldType
}) {
  const [value, setValue] = useState(text);
  const [isEditingLocal, setIsEditingLocal] = useState(false);
  const [originalValue, setOriginalValue] = useState(text);
  const elementRef = useRef(null);

  const handleElementClick = (e) => {
    if (isEditing && !isEditingLocal) {
      e.stopPropagation();
      if (onElementSelect) {
        onElementSelect({
          element: elementRef.current,
          text: value,
          type: fieldType
        });
      }
    }
  };

  const handleTextClick = () => {
    if (isSelected && !isEditingLocal) {
      setIsEditingLocal(true);
    }
  };

  const handleBlur = () => {
    handleSave();
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

  // Aplicar estilos desde el panel
  const applyStyles = () => {
    if (!currentStyles) return '';
    
    let styleClasses = '';
    
    if (currentStyles.bold) styleClasses += 'font-bold ';
    if (currentStyles.italic) styleClasses += 'italic ';
    if (currentStyles.underline) styleClasses += 'underline ';
    
    switch (currentStyles.fontSize) {
      case 'small': styleClasses += 'text-sm '; break;
      case 'large': styleClasses += 'text-lg '; break;
      default: styleClasses += 'text-base ';
    }

    return styleClasses;
  };

  if (isEditing && isEditingLocal) {
    if (multiline) {
      return (
        <div 
          ref={elementRef}
          className={`relative ${isSelected ? 'selected' : ''}`}
        >
          {isSelected && <div className="selected-element-indicator">Editando</div>}
          <textarea
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`${className} ${applyStyles()} w-full resize-none overflow-hidden break-words whitespace-normal contain-text bg-transparent outline-none rounded-lg p-2 editing-cursor`}
            style={{
              minHeight: '60px',
              color: currentStyles?.color || 'inherit'
            }}
          />
        </div>
      );
    } else {
      return (
        <div 
          ref={elementRef}
          className={`relative ${isSelected ? 'selected' : ''}`}
        >
          {isSelected && <div className="selected-element-indicator">Editando</div>}
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`${className} ${applyStyles()} w-full break-words whitespace-normal contain-text bg-transparent outline-none rounded-lg p-2 editing-cursor`}
            style={{
              color: currentStyles?.color || 'inherit'
            }}
          />
        </div>
      );
    }
  }

  return (
    <div 
      ref={elementRef}
      onClick={handleElementClick}
      className={`element-highlight ${isSelected ? 'selected' : ''} ${isEditing ? 'cursor-pointer' : ''} smooth-transition`}
    >
      {isSelected && <div className="selected-element-indicator">Seleccionado</div>}
      <div
        onClick={handleTextClick}
        className={`${className} ${applyStyles()} break-words whitespace-normal overflow-hidden text-contain rounded-lg p-2 min-h-[44px] flex items-center ${
          value === placeholder ? 'text-gray-400 italic' : ''
        } ${isEditing ? 'edit-tooltip' : ''}`}
        style={{
          color: currentStyles?.color || 'inherit'
        }}
      >
        {value || placeholder}
      </div>
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
  onSave,
  onElementSelect,
  isSelected,
  currentStyles,
  cardIndex
}) {
  const handleTitleSave = (newTitle) => {
    if (onSave) onSave({ type: 'title', value: newTitle });
  };

  const handleDescriptionSave = (newDescription) => {
    if (onSave) onSave({ type: 'description', value: newDescription });
  };

  const handleCardClick = (e) => {
    if (isEditing && onElementSelect) {
      e.stopPropagation();
      onElementSelect({
        element: e.currentTarget,
        text: `${title} - ${description}`,
        type: 'card',
        index: cardIndex
      });
    }
  };

  const CardContent = () => (
    <div 
      onClick={handleCardClick}
      className={`p-4 rounded-lg border-2 ${borderColor} ${bgColor} shadow-sm hover:shadow-md transition-all duration-300 min-h-[160px] flex flex-col overflow-hidden w-full smooth-transition element-highlight ${isSelected ? 'selected' : ''}`}
    >
      {isSelected && <div className="selected-element-indicator">Tarjeta {cardIndex + 1}</div>}
      
      <div className="mb-3 min-h-[52px] flex items-start overflow-hidden">
        <SimpleEditableText
          text={title}
          isEditing={isEditing}
          onSave={handleTitleSave}
          onElementSelect={onElementSelect}
          isSelected={isSelected}
          currentStyles={currentStyles}
          fieldType={`card-${cardIndex}-title`}
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
          onElementSelect={onElementSelect}
          isSelected={isSelected}
          currentStyles={currentStyles}
          fieldType={`card-${cardIndex}-description`}
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
