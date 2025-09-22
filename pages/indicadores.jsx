import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Indicadores() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <Navbar onToggleEdit={setIsEditing} />
      <main className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Indicadores</h1>
        <p>Página de indicadores en construcción...</p>
      </main>
    </div>
  );
}
