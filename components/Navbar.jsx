'use client';
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import LoginModal from "./LoginModal";

export default function Navbar({ onToggleEdit }) {
  const [session, setSession] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsEditing(false);
    onToggleEdit(false);
  };

  const toggleEdit = () => {
    const newState = !isEditing;
    setIsEditing(newState);
    onToggleEdit(newState);
  };

  return (
    <>
      <nav className="navbar bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Sistema de Residuos</div>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:text-blue-400">Inicio</a></li>
          <li><a href="/indicadores" className="hover:text-blue-400">Indicadores</a></li>
          <li><a href="/metas" className="hover:text-blue-400">Metas</a></li>
          <li><a href="/avances" className="hover:text-blue-400">Avances</a></li>
          <li><a href="/reportes" className="hover:text-blue-400">Reportes</a></li>
          <li><a href="/formularios" className="hover:text-blue-400">Formularios</a></li>
        </ul>
        <div>
          {!session ? (
            <button 
              onClick={() => setShowModal(true)} 
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors"
            >
              Iniciar Sesión
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-sm">{session.user.email}</span>
              <button 
                onClick={toggleEdit} 
                className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded transition-colors"
              >
                {isEditing ? "Salir de Edición" : "Modo Edición"}
              </button>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </nav>

      <LoginModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
