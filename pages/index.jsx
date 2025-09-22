import { useState } from "react";
import Navbar from "../components/Navbar";
import EditableText from "../components/EditableText";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newValue) => {
    console.log("Texto guardado:", newValue);
    // 🚀 Aquí puedes enviar el nuevo valor a Supabase si quieres persistirlo
  };

  return (
    <div>
      <Navbar onToggleEdit={setIsEditing} />
      <main className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <EditableText
          text="Sistema de Gestión de Residuos Sólidos"
          tag="h1"
          isEditing={isEditing}
          onSave={handleSave}
        />
        <EditableText
          text="Monitorea indicadores, gestiona metas y genera reportes de sostenibilidad."
          tag="p"
          isEditing={isEditing}
          onSave={handleSave}
        />
      </main>
    </div>
  );
}
