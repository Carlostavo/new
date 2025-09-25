'use client';
import Link from "next/link";

export default function Navbar({ user, onLogin, onLogout, onToggleEdit, isEditing }) {
  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold">Mi Sitio</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button onClick={onToggleEdit} className="bg-white text-blue-600 px-3 py-1 rounded">
              {isEditing ? "Salir edición" : "Editar"}
            </button>
            <button onClick={onLogout} className="bg-red-500 px-3 py-1 rounded">Salir</button>
          </>
        ) : (
          <button onClick={onLogin} className="bg-white text-blue-600 px-3 py-1 rounded">Login</button>
        )}
      </div>
    </nav>
  );
}
