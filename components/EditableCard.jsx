'use client';
import { useState } from "react";
import Link from "next/link";

// Componente simple para evitar importaciones circulares
function SimpleEditableText({ 
  text, 
  isEditing, 
  onSave,
  className = "" 
}) {
  const [value, setValue] = useState(text);
  const [isEditingLocal, setIsEditingLocal] = useState(false);

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

  if (isEditing && isEditingLocal) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
        className={`${className} border border-dashed border-blue-400 p-1 rounded bg-blue-50 outline-none w-full`}
        autoFocus
      />
    );
  }

  if (isEditing) {
    return (
      <div
        onClick={handleClick}
        className={`${className} border border-dashed border-transparent p-1 rounded hover:border-gray-300 cursor-pointer`}
      >
        {value}
      </div>
    );
  }

  return (
    <div className={className}>
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
    <div className={`p-6 rounded-lg border-2 ${borderColor} ${bgColor} shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col min-h-[200px]`}>
      <div className="mb-3 min-h-[60px]">
        <SimpleEditableText
          text={title}
          isEditing={isEditing}
          onSave={handleTitleSave}
          className="text-xl font-semibold text-gray-800 w-full"
        />
      </div>
      
      <div className="flex-grow min-h-[80px]">
        <SimpleEditableText
          text={description}
          isEditing={isEditing}
          onSave={handleDescriptionSave}
          className="text-gray-600 w-full"
        />
      </div>
      
      {!isEditing && link && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
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
