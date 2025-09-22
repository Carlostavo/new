import { useState } from "react";
import Navbar from "../components/Navbar";
import EditableCard from "../components/EditableCard";
import EditableText from "../components/EditableText";

export default function Formularios() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newValue) => {
    console.log("Texto guardado:", newValue);
  };

  const cardData = [
    {
      title: "Formularios de Registro",
      description: "Formularios para el registro diario de residuos generados",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      title: "Formularios de Seguimiento",
      description: "Formatos para el seguimiento de proyectos y actividades",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200"
    }
  ];

  return (
    <div>
      <Navbar onToggleEdit={setIsEditing} />
      <main className="max-w-6xl mx-auto mt-10 p-6">
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <EditableText
            text="Formularios y Formatos"
            tag="h1"
            isEditing={isEditing}
            onSave={handleSave}
            className="text-3xl font-bold text-gray-800 mb-4"
          />
          <EditableText
            text="Accede a todos los formularios necesarios para el registro y seguimiento."
            tag="p"
            isEditing={isEditing}
            onSave={handleSave}
            className="text-lg text-gray-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardData.map((card, index) => (
            <EditableCard
              key={index}
              title={card.title}
              description={card.description}
              bgColor={card.bgColor}
              borderColor={card.borderColor}
              isEditing={isEditing}
              onSave={handleSave}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
