import { useState } from "react";
import dynamic from 'next/dynamic';

// Cargar Navbar dinámicamente para evitar SSR con Supabase
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
import EditableCard from "../components/EditableCard";
import EditableText from "../components/EditableText";

export default function Indicadores() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newValue) => {
    console.log("Texto guardado:", newValue);
  };

  const cardData = [
    {
      title: "Indicadores de Generación",
      description: "Monitorea la cantidad de residuos generados por área y período",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Indicadores de Separación",
      description: "Evalúa la efectividad en la separación de residuos reciclables",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ];

  return (
    <div>
      <Navbar onToggleEdit={setIsEditing} />
      <main className="max-w-6xl mx-auto mt-10 p-6">
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <EditableText
            text="Indicadores de Gestión"
            tag="h1"
            isEditing={isEditing}
            onSave={handleSave}
            className="text-3xl font-bold text-gray-800 mb-4"
          />
          <EditableText
            text="Sigue los principales indicadores de desempeño en la gestión de residuos sólidos."
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
