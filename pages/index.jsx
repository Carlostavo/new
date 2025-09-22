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
  const [activeElementId, setActiveElementId] = useState(null);
  const [elementStyles, setElementStyles] = useState({});
  const [globalStyles, setGlobalStyles] = useState({});

  // IDs únicos para cada elemento editable
  const elementIds = {
    title: 'main-title',
    description: 'main-description',
    card1Title: 'card-1-title',
    card1Desc: 'card-1-desc',
    card2Title: 'card-2-title',
    card2Desc: 'card-2-desc',
    card3Title: 'card-3-title',
    card3Desc: 'card-3-desc',
    card4Title: 'card-4-title',
    card4Desc: 'card-4-desc',
    card5Title: 'card-5-title',
    card5Desc: 'card-5-desc'
  };

  const handleSave = (newValue, elementId) => {
    console.log("Texto guardado:", newValue, "para elemento:", elementId);
    // Aquí puedes guardar en Supabase con el elementId
  };

  const handleStyleChange = (styles) => {
    if (activeElementId) {
      setElementStyles(prev => ({
        ...prev,
        [activeElementId]: styles
      }));
    }
  };

  const handleEditStart = (elementId) => {
    setActiveElementId(elementId);
    setIsEditPanelOpen(true);
  };

  const handleApplyToAll = (styles) => {
    setGlobalStyles(styles);
    // Aplicar a todos los elementos
    const allIds = Object.values(elementIds);
    const newStyles = {};
    allIds.forEach(id => {
      newStyles[id] = styles;
    });
    setElementStyles(newStyles);
  };

  const cardData = [
    { id: 1, title: "Indicadores", description: "Monitorea los principales indicadores...", link: "/indicadores", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
    { id: 2, title: "Metas", description: "Establece y sigue el cumplimiento...", link: "/metas", bgColor: "bg-green-50", borderColor: "border-green-200" },
    { id: 3, title: "Avances", description: "Visualiza el progreso en los proyectos...", link: "/avances", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" },
    { id: 4, title: "Reportes", description: "Genera reportes detallados de gestión...", link: "/reportes", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
    { id: 5, title: "Formularios", description: "Accede a formularios de registro...", link: "/formularios", bgColor: "bg-red-50", borderColor: "border-red-200" }
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
            elementId={elementIds.title}
            isActive={activeElementId === elementIds.title}
            localStyles={elementStyles[elementIds.title] || globalStyles}
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 break-words"
            placeholder="Título principal del sistema..."
          />
          <EditableText
            text="Monitorea indicadores, gestiona metas y genera reportes de sostenibilidad para una gestión eficiente."
            tag="p"
            isEditing={isEditing}
            onSave={handleSave}
            onEditStart={handleEditStart}
            elementId={elementIds.description}
            isActive={activeElementId === elementIds.description}
            localStyles={elementStyles[elementIds.description] || globalStyles}
            className="text-base sm:text-lg text-gray-600 break-words"
            placeholder="Descripción del sistema..."
          />
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {cardData.map((card) => (
            <div key={card.id} className="w-full smooth-transition edit-hover">
              <EditableCard
                title={card.title}
                description={card.description}
                link={card.link}
                bgColor={card.bgColor}
                borderColor={card.borderColor}
                isEditing={isEditing}
                onSave={handleSave}
                onEditStart={handleEditStart}
                elementIdPrefix={`card-${card.id}`}
                isActive={activeElementId?.startsWith(`card-${card.id}`)}
                localStyles={elementStyles[`card-${card.id}-title`] || elementStyles[`card-${card.id}-desc`] || globalStyles}
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
          title="Abrir editor"
        >
          ✎
        </button>
      )}

      {/* Indicador de elemento activo */}
      {isEditing && activeElementId && (
        <div className="active-element-indicator">
          Editando: {activeElementId.includes('title') ? 'Título' : 'Descripción'}
        </div>
      )}

      {/* Panel lateral de edición */}
      <EditPanel 
        isOpen={isEditPanelOpen}
        onClose={() => {
          setIsEditPanelOpen(false);
          setActiveElementId(null);
        }}
        onStyleChange={handleStyleChange}
        onApplyToAll={handleApplyToAll}
        activeElement={activeElementId ? (activeElementId.includes('title') ? 'Título' : 'Descripción') : null}
      />
    </div>
  );
}
