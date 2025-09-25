'use client';
import { useState } from "react";
import Navbar from "../components/Navbar";
import EditableCard from "../components/EditableCard";
import EditPanel from "../components/EditPanel";

export default function HomePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [cards, setCards] = useState([
    { id: 1, title: "Meta 1", description: "Descripción de la meta 1", link: "/metas/1" },
    { id: 2, title: "Avance 1", description: "Descripción del avance 1", link: "/avances/1" },
    { id: 3, title: "Reporte 1", description: "Descripción del reporte 1", link: "/reportes/1" }
  ]);

  const handleSave = ({ type, value, cardId }) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, [type]: value } : card
      )
    );
  };

  const handleApplyStyles = (id, styles) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === selectedElement.cardId
          ? {
              ...card,
              [`${selectedElement.type}Styles`]: styles
            }
          : card
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isEditing={isEditing} onToggleEdit={() => setIsEditing(!isEditing)} />

      <main className="max-w-6xl mx-auto px-4 py-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <EditableCard
            key={card.id}
            cardId={card.id}
            title={card.title}
            description={card.description}
            link={card.link}
            isEditing={isEditing}
            onSave={handleSave}
            onSelect={setSelectedElement}
            isSelected={selectedElement?.cardId === card.id}
            isEditingThisElement={selectedElement?.id?.includes(card.id)}
            titleStyles={card.titleStyles}
            descriptionStyles={card.descriptionStyles}
          />
        ))}
      </main>

      <EditPanel
        isOpen={!!selectedElement}
        onClose={() => setSelectedElement(null)}
        onApplyStyles={handleApplyStyles}
        selectedElement={selectedElement}
      />
    </div>
  );
}
