// pages/index.jsx
import { useState, useEffect } from "react";
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
  const [selectedElement, setSelectedElement] = useState(null);
  const [editingElementId, setEditingElementId] = useState(null);
  const [elementStyles, setElementStyles] = useState({});
  const [cards, setCards] = useState([]);

  // Cargar datos iniciales
  useEffect(() => {
    const initialCards = [
      {
        id: 'card-1',
        title: "Indicadores",
        description: "Monitorea los principales indicadores de gestión de residuos en tiempo real",
        link: "/indicadores",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200"
      },
      {
        id: 'card-2', 
        title: "Metas",
        description: "Establece y sigue el cumplimiento de metas ambientales y de sostenibilidad",
        link: "/metas",
        bgColor: "bg-green-50",
        borderColor: "border-green-200"
      },
      {
        id: 'card-3',
        title: "Avances",
        description: "Visualiza el progreso en los proyectos de sostenibilidad y gestión",
        link: "/avances",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200"
      },
      {
        id: 'card-4',
        title: "Reportes",
        description: "Genera reportes detallados de gestión de residuos e indicadores clave",
        link: "/reportes",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200"
      },
      {
        id: 'card-5',
        title: "Formularios",
        description: "Accede a formularios de registro, seguimiento y control de residuos",
        link: "/formularios",
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
      }
    ];
    setCards(initialCards);
  }, []);

  const handleSave = (saveData) => {
    console.log("Texto guardado:", saveData);
    
    if (saveData.type === 'title' || saveData.type === 'description') {
      setCards(prev => prev.map(card => 
        card.id === saveData.cardId 
          ? { 
              ...card, 
              [saveData.type === 'title' ? 'title' : 'description']: saveData.value 
            }
          : card
      ));
    }
  };

  const handleElementSelect = (element) => {
    setSelectedElement(element);
    setEditingElementId(element.id);
  };

  const handleStartEdit = (elementId) => {
    setEditingElementId(elementId);
  };

  const handleApplyStyles = (elementId, styles) => {
    setElementStyles(prev => ({
      ...prev,
      [elementId]: styles
    }));
  };

  const handleToggleEdit = (editMode) => {
    setIsEditing(editMode);
    if (!editMode) {
      setSelectedElement(null);
      setEditingElementId(null);
    }
  };

  const handleAddCard = () => {
    const newCard = {
      id: `card-${Date.now()}`,
      title: "Nueva Tarjeta",
      description: "Descripción de la nueva tarjeta",
      link: "#",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    };
    setCards(prev => [...prev, newCard]);
  };

  const handleDeleteCard = (cardId) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
    if (selectedElement?.cardId === cardId) {
      setSelectedElement(null);
      setEditingElementId(null);
    }
  };

  const handleDuplicateCard = (cardId) => {
    const originalCard = cards.find(card => card.id === cardId);
    if (originalCard) {
      const duplicatedCard = {
        ...originalCard,
        id: `card-${Date.now()}`,
        title: `${originalCard.title} (copia)`
      };
      setCards(prev => [...prev, duplicatedCard]);
    }
  };

  return (
    <div className="app-container">
      <EditPanel 
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onStyleChange={() => {}}
        selectedElement={selectedElement}
        onApplyStyles={handleApplyStyles}
      />

      <div className={`main-content ${isEditing ? 'with-panel' : ''}`}>
        <Navbar onToggleEdit={handleToggleEdit} />
        
        <main className="max-w-7xl mx-auto mt-10 p-4 sm:p-6">
          {/* Header editable con botón de agregar */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow w-full text-contain relative">
            {isEditing && (
              <button 
                onClick={handleAddCard}
                className="absolute -top-3 -right-3 bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors z-10"
                title="Agregar nueva tarjeta"
              >
                +
              </button>
            )}
            
            <EditableText
              text="Sistema de Gestión de Residuos Sólidos"
              tag="h1"
              isEditing={isEditing}
              onSave={handleSave}
              onSelect={handleElementSelect}
              isSelected={selectedElement?.id === 'main-title'}
              isEditingThisElement={editingElementId === 'main-title'}
              elementId="main-title"
              styles={elementStyles['main-title'] || {}}
              onStartEdit={handleStartEdit}
              className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 break-words"
              placeholder="Título principal del sistema..."
            />
            <EditableText
              text="Monitorea indicadores, gestiona metas y genera reportes de sostenibilidad para una gestión eficiente."
              tag="p"
              isEditing={isEditing}
              onSave={handleSave}
              onSelect={handleElementSelect}
              isSelected={selectedElement?.id === 'main-description'}
              isEditingThisElement={editingElementId === 'main-description'}
              elementId="main-description"
              styles={elementStyles['main-description'] || {}}
              onStartEdit={handleStartEdit}
              className="text-base sm:text-lg text-gray-600 break-words"
              placeholder="Descripción del sistema..."
            />
          </div>

          {/* Grid de tarjetas con drag & drop visual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {cards.map((card) => (
              <div key={card.id} className="w-full transition-all duration-200 hover:scale-105">
                <EditableCard
                  title={card.title}
                  description={card.description}
                  link={card.link}
                  bgColor={card.bgColor}
                  borderColor={card.borderColor}
                  isEditing={isEditing}
                  onSave={handleSave}
                  onSelect={handleElementSelect}
                  isSelected={selectedElement?.cardId === card.id}
                  isEditingThisElement={editingElementId === card.id}
                  cardId={card.id}
                  titleStyles={elementStyles[`${card.id}-title`] || {}}
                  descriptionStyles={elementStyles[`${card.id}-description`] || {}}
                  onStartEdit={handleStartEdit}
                  onDelete={handleDeleteCard}
                  onDuplicate={handleDuplicateCard}
                />
              </div>
            ))}
          </div>

          {/* Mensaje cuando no hay tarjetas */}
          {cards.length === 0 && isEditing && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay tarjetas. ¡Agrega una nueva!</p>
              <button 
                onClick={handleAddCard}
                className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                + Agregar Primera Tarjeta
              </button>
            </div>
          )}
        </main>
      </div>

      {isEditing && (
        <div className={`edit-mode-indicator ${isEditing ? 'with-panel' : 'without-panel'}`}>
          ✎ Modo Edición Activo - {cards.length} tarjetas
        </div>
      )}
    </div>
  );
}
