// components/EditableCard.jsx
'use client';
import { useState, useEffect, useRef } from "react";
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
  onEditStart,
  currentStyles
}) {
  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);

  useEffect(() => {
    setLocalTitle(title);
    setLocalDescription(description);
  }, [title, description]);

  const handleTitleSave = (newValue) => {
    setLocalTitle(newValue);
    if (onSave) onSave(newValue);
  };

  const handleDescriptionSave = (newValue) => {
    setLocalDescription(newValue);
    if (onSave) onSave(newValue);
  };

  const cardContent = (
    <div className={`${bgColor} ${borderColor} border-2 rounded-lg p-6 h-full shadow-sm hover:shadow-md transition-shadow duration-300`}>
      <EditableText
        text={localTitle}
        tag="h3"
        isEditing={isEditing}
        onSave={handleTitleSave}
        onEditStart={onEditStart}
        currentStyles={currentStyles}
        className="text-xl font-semibold text-gray-800 mb-3 card-title"
        placeholder="Título de la tarjeta..."
      />
      <EditableText
        text={localDescription}
        tag="p"
        isEditing={isEditing}
        onSave={handleDescriptionSave}
        onEditStart={onEditStart}
        currentStyles={currentStyles}
        className="text-gray-600 card-description"
        placeholder="Descripción de la tarjeta..."
      />
    </div>
  );

  if (link && !isEditing) {
    return (
      <Link href={link} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
