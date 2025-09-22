'use client';
import { useState } from "react";
import EditableText from "./EditableText";
import Link from "next/link";

export default function EditableCard({ 
  title, 
  description, 
  link, 
  bgColor = "bg-white", 
  borderColor = "border-gray-200",
  isEditing, 
  onSave 
}) {
  const [cardTitle, setCardTitle] = useState(title);
  const [cardDescription, setCardDescription] = useState(description);

  const handleTitleSave = (newTitle) => {
    setCardTitle(newTitle);
    if (onSave) onSave({ type: 'title', value: newTitle });
  };

  const handleDescriptionSave = (newDescription) => {
    setCardDescription(newDescription);
    if (onSave) onSave({ type: 'description', value: newDescription });
  };

  const CardContent = () => (
    <div className={`p-6 rounded-lg border-2 ${borderColor} ${bgColor} shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col`}>
      <EditableText
        text={cardTitle}
        tag="h3"
        isEditing={isEditing}
        onSave={handleTitleSave}
        className="text-xl font-semibold text-gray-800 mb-3"
      />
      <EditableText
        text={cardDescription}
        tag="p"
        isEditing={isEditing}
        onSave={handleDescriptionSave}
        className="text-gray-600 flex-grow"
      />
      {!isEditing && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
            Ver más →
          </span>
        </div>
      )}
    </div>
  );

  if (isEditing) {
    return <CardContent />;
  }

  return (
    <Link href={link} className="block h-full">
      <CardContent />
    </Link>
  );
}
