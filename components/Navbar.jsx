'use client';
import Link from "next/link";
import { useAuth } from "../lib/useAuth";

export default function Navbar({ isEditing, onToggleEdit }) {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-14">
        <Link href="/" className="text-lg font-bold hover:text-blue-400">MiApp</Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-blue-400">Inicio</Link>
          <Link href="/metas" className="hover:text-blue-400">Metas</Link>
          <Link href="/avances" className="hover:text-blue-400">Avances</Link>
          <Link href="/reportes" className="hover:text-blue-400">Reportes</Link>

          {user && (
            <>
              <button
                onClick={onToggleEdit}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isEditing ? "Salir edición" : "Editar"}
              </button>
              <button onClick={signOut} className="hover:text-red-400">Salir</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
