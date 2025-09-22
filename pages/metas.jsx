import { useState } from "react";
import Navbar from "../components/Navbar";
import EditableCard from "../components/EditableCard";
import EditableText from "../components/EditableText";

export default function Metas() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newValue) => {
    console.log("Texto guardado:", newValue);
  };

  const cardData = [
    {
      title: "Metas Anuales",
      description: "Establece y sigue las metas de reducción de residuos para el año en curso",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Metas de Reciclaje",
      description: "Objetivos específicos para incrementar las tasas de reciclaje",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200"
    }
  ];

  return (
    <div>
      <Navbar onToggleEdit={setIsEditing} />
      <main className="max-w-6xl mx-auto mt-10 p-6">
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <EditableText
            text="Metas de Sostenibilidad"
            tag="h1"
            isEditing={isEditing}
            onSave={handleSave}
            className="text-3xl font-bold text-gray-800 mb-4"
          />
          <EditableText
            text="Establece y monitorea las metas ambientales para una gestión sostenible."
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
