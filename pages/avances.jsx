import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Avances() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <Navbar onToggleEdit={setIsEditing} />
      <main className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">Avances</h1>
        <p>Página de avances en construcción...</p>
      </main>
    </div>
  );
}
