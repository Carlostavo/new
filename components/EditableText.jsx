import { useState } from "react";
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
import EditableCard from "../components/EditableCard";
import EditableText from "../components/EditableText";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newValue) => {
    console.log("Texto guardado:", newValue);
  };

  const cardData = [
    {
      title: "Indicadores",
      description: "Monitorea los principales indicadores de gestión de residuos en tiempo real",
      link: "/indicadores",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Metas",
      description: "Establece y sigue el cumplimiento de metas ambientales y de sostenibilidad",
      link: "/metas",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Avances",
      description: "Visualiza el progreso en los proyectos de sostenibilidad y gestión de residuos",
      link: "/avances",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      title: "Reportes",
      description: "Genera reportes detallados de gestión de residuos e indicadores clave",
      link: "/reportes",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      title: "Formularios",
      description: "Accede a formularios de registro, seguimiento y control de residuos",
      link: "/formularios",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onToggleEdit={setIsEditing} />
      <main className="max-w-7xl mx-auto mt-10 p-6">
        {/* Header */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow w-full">
          <EditableText
            text="Sistema de Gestión de Residuos Sólidos"
            tag="h1"
            isEditing={isEditing}
            onSave={handleSave}
            className="text-3xl font-bold text-gray-800 mb-4 w-full break-words"
          />
          <EditableText
            text="Monitorea indicadores, gestiona metas y genera reportes de sostenibilidad para una gestión eficiente de residuos."
            tag="p"
            isEditing={isEditing}
            onSave={handleSave}
            className="text-lg text-gray-600 w-full break-words"
          />
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {cardData.map((card, index) => (
            <div key={index} className="w-full">
              <EditableCard
                title={card.title}
                description={card.description}
                link={card.link}
                bgColor={card.bgColor}
                borderColor={card.borderColor}
                isEditing={isEditing}
                onSave={handleSave}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
