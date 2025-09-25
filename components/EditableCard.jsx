'use client';
import { useRef } from "react";
import Link from "next/link";
import EditableText from "./EditableText";

export default function EditableCard({ 
  title, 
  description, 
  link, 
  bgColor = "bg-white", 
  borderColor = "border-gray-200",
  isEditing, 
  onSave,
  onSelect,
  isSelected = false,
  isEditingThisElement = false,
  cardId,
  titleStyles = {},
  descriptionStyles = {},
  onStartEdit
}) {
  const containerRef = useRef(null);

  const handleSave = (type, value) => onSave?.({ type, value, cardId });

  const handleElementSelect = (element) => {
    onSelect?.({ ...element, cardId });
  };

  const CardContent = () => (
    <div
      ref={containerRef}
      className={`p-4 rounded-lg border-2 ${borderColor} ${bgColor} shadow-md transition-all duration-300 min-h-[160px] flex flex-col overflow-hidden w-full ${
        isSelected ? 'selected' : isEditing ? 'editable-hover' : ''
      }`}
      onClick={() => isEditing && onSelect?.({ type: 'card', id: cardId, text: title })}
    >
      <EditableText
        text={title}
        tag="h3"
        isEditing={isEditing}
        onSave={(val) => handleSave("title", val)}
        onSelect={handleElementSelect}
        isSelected={isSelected}
        isEditingThisElement={isEditingThisElement}
        elementId={`${cardId}-title`}
        styles={titleStyles}
        onStartEdit={onStartEdit}
        className="text-lg font-semibold"
        placeholder="Título..."
      />

      <EditableText
        text={description}
        tag="textarea"
        isEditing={isEditing}
        onSave={(val) => handleSave("description", val)}
        onSelect={handleElementSelect}
        isSelected={isSelected}
        isEditingThisElement={isEditingThisElement}
        elementId={`${cardId}-description`}
        styles={descriptionStyles}
        onStartEdit={onStartEdit}
        className="text-sm text-gray-600 mt-2 flex-grow"
        placeholder="Descripción..."
      />

      {!isEditing && link && (
        <div className="mt-3 pt-2 border-t border-gray-200">
          <span className="text-blue-600 text-sm font-medium hover:text-blue-800">Ver más →</span>
        </div>
      )}
    </div>
  );

  return isEditing || !link ? <CardContent /> : <Link href={link} className="block w-full"><CardContent /></Link>;
}
