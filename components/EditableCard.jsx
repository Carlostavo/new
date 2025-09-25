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

  return (
    <div 
      ref={containerRef}
      className={`p-4 rounded-lg border ${borderColor} ${bgColor} shadow-sm transition-all duration-300 flex flex-col gap-2 ${isEditing ? "cursor-pointer" : ""}`}
    >
      <EditableText
        text={title}
        tag="h3"
        isEditing={isEditing}
        onSave={(val) => onSave?.({ type: "title", value: val, cardId })}
        onSelect={onSelect}
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
        tag="p"
        isEditing={isEditing}
        onSave={(val) => onSave?.({ type: "description", value: val, cardId })}
        onSelect={onSelect}
        isSelected={isSelected}
        isEditingThisElement={isEditingThisElement}
        elementId={`${cardId}-description`}
        styles={descriptionStyles}
        onStartEdit={onStartEdit}
        className="text-gray-600"
        placeholder="Descripción..."
      />
      {!isEditing && link && (
        <Link href={link} className="text-blue-500 text-sm mt-2 hover:underline">
          Ver más →
        </Link>
      )}
    </div>
  );
}
