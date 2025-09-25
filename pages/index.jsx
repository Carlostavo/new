'use client';
import { useState } from "react";
import EditableText from "../components/EditableText";
import EditableCard from "../components/EditableCard";
import EditPanel from "../components/EditPanel";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [editingElementId, setEditingElementId] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = () => setUser({ name: "Admin" });
  const handleLogout = () => setUser(null);
  const handleToggleEdit = () => setIsEditing((prev) => !prev);

  const handleStyleChange = (property, value) => {
    if (!selectedElement) return;
    setSelectedElement({
      ...selectedElement,
      styles: {
        ...selectedElement.styles,
        [property]: value !== undefined ? value : !selectedElement.styles?.[property],
      },
    });
  };

  return (
    <div>
      <Navbar
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onToggleEdit={handleToggleEdit}
        isEditing={isEditing}
      />

      <main className="p-6 max-w-5xl mx-auto">
        <EditableText
          text="Bienvenido a mi página"
          isEditing={isEditing}
          onSave={(val) => console.log("Nuevo título:", val)}
          tag="h1"
          className="text-3xl font-bold mb-4"
          onSelect={setSelectedElement}
          isSelected={selectedElement?.id === "title"}
          isEditingThisElement={editingElementId === "title"}
          elementId="title"
          onStartEdit={setEditingElementId}
        />

        <EditableText
          text="Este es un texto de ejemplo editable."
          isEditing={isEditing}
          onSave={(val) => console.log("Nuevo texto:", val)}
          tag="p"
          className="text-gray-700 mb-6"
          onSelect={setSelectedElement}
          isSelected={selectedElement?.id === "desc"}
          isEditingThisElement={editingElementId === "desc"}
          elementId="desc"
          onStartEdit={setEditingElementId}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <EditableCard
            title="Card 1"
            description="Descripción de card 1."
            link="#"
            isEditing={isEditing}
            onSave={(val) => console.log("Card edit:", val)}
            onSelect={setSelectedElement}
            isSelected={selectedElement?.id === "card1"}
            isEditingThisElement={editingElementId === "card1"}
            cardId="card1"
            onStartEdit={setEditingElementId}
          />
          <EditableCard
            title="Card 2"
            description="Descripción de card 2."
            link="#"
            isEditing={isEditing}
            onSave={(val) => console.log("Card edit:", val)}
            onSelect={setSelectedElement}
            isSelected={selectedElement?.id === "card2"}
            isEditingThisElement={editingElementId === "card2"}
            cardId="card2"
            onStartEdit={setEditingElementId}
          />
          <EditableCard
            title="Card 3"
            description="Descripción de card 3."
            link="#"
            isEditing={isEditing}
            onSave={(val) => console.log("Card edit:", val)}
            onSelect={setSelectedElement}
            isSelected={selectedElement?.id === "card3"}
            isEditingThisElement={editingElementId === "card3"}
            cardId="card3"
            onStartEdit={setEditingElementId}
          />
        </div>
      </main>

      <EditPanel selectedElement={selectedElement} onStyleChange={handleStyleChange} />
    </div>
  );
}
