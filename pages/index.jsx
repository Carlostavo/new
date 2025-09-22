import { useState } from "react";
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import("../components/Navbar"), { 
  ssr: false,
  loading: () => (
    <nav className="navbar bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Sistema de Residuos</div>
      <div className="bg-gray-600 px-4 py-2 rounded">Cargando...</div>
    </nav>
  )
});

const EditableCard = dynamic(() => import("../components/EditableCard"), { 
  ssr: false 
});

const EditableText = dynamic(() => import("../components/EditableText"), { 
  ssr: false 
});

const EditPanel = dynamic(() => import("../components/EditPanel"), { 
  ssr: false 
});

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [currentStyles, setCurrentStyles] = useState({});

  const handleSave = (newValue) => {
    console.log("Texto guardado:", newValue);
  };

  const handleStyleChange = (styles) => {
    setCurrentStyles(styles);
  };

  const handleEditStart = () => {
    setIsEditPanelOpen(true);
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
      description: "Visualiza el progreso en los proyectos de sostenibilidad y gestión",
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
    <div className={`min-h-screen bg-gray-50 smooth-transition ${isEditing ? 'edit-mode-active' : ''}`}>
      <Navbar onToggleEdit={setIsEditing} />
      
      <main className="max-w-7xl mx-auto mt-10 p-4 sm:p-6">
        {/* Header editable */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow w-full text-contain smooth-transition edit-hover">
          <EditableText
            text="Sistema de Gestión de Residuos Sólidos"
            tag="h1"
            isEditing={isEditing}
            onSave={handleSave}
            onEditStart={handleEditStart}
            currentStyles={currentStyles}
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 break-words"
            placeholder="Título principal del sistema..."
          />
          <EditableText
            text="Monitorea indicadores, gestiona metas y genera reportes de sostenibilidad para una gestión eficiente."
            tag="p"
            isEditing={isEditing}
            onSave={handleSave}
            onEditStart={handleEditStart}
            currentStyles={currentStyles}
            className="text-base sm:text-lg text-gray-600 break-words"
            placeholder="Descripción del sistema..."
          />
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {cardData.map((card, index) => (
            <div key={index} className="w-full smooth-transition edit-hover">
              <EditableCard
                title={card.title}
                description={card.description}
                link={card.link}
                bgColor={card.bgColor}
                borderColor={card.borderColor}
                isEditing={isEditing}
                onSave={handleSave}
                onEditStart={handleEditStart}
                currentStyles={currentStyles}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Botón flotante para abrir panel de edición */}
      {isEditing && (
        <button 
          className="edit-panel-toggle"
          onClick={() => setIsEditPanelOpen(true)}
          title="Abrir editor profesional"
        >
          ✎
        </button>
      )}

      {/* Panel lateral de edición profesional */}
      <EditPanel 
        isOpen={isEditPanelOpen}
        onClose={() => setIsEditPanelOpen(false)}
        onStyleChange={handleStyleChange}
        currentElement={null}
      />
    </div>
  );
}
