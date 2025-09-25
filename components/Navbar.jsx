'use client';
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import LoginModal from "./LoginModal";
import Link from "next/link";

export default function Navbar({ onToggleEdit }) {
  const [session, setSession] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

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
    setIsMenuOpen(false);
  };

  const toggleEdit = () => {
    const newState = !isEditing;
    setIsEditing(newState);
    onToggleEdit(newState);
    setIsMenuOpen(false);
  };

  if (!mounted) {
    return (
      <nav className="bg-white shadow-professional border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg"></div>
            <div className="h-6 bg-gray-200 rounded w-32 skeleton"></div>
          </div>
          <div className="bg-gray-200 rounded-lg px-4 py-2 w-32 skeleton"></div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-white shadow-professional border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y marca */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">♻️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EcoGestión</h1>
                <p className="text-xs text-gray-500">Sistema de Residuos</p>
              </div>
            </div>

            {/* Navegación desktop */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/" label="Inicio" />
              <NavLink href="/indicadores" label="Indicadores" />
              <NavLink href="/metas" label="Metas" />
              <NavLink href="/avances" label="Avances" />
              <NavLink href="/reportes" label="Reportes" />
              <NavLink href="/formularios" label="Formularios" />
            </div>

            {/* Controles de usuario */}
            <div className="flex items-center gap-3">
              {!session ? (
                <button 
                  onClick={() => setShowModal(true)} 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Iniciar Sesión
                </button>
              ) : (
                <>
                  {/* Modo edición toggle */}
                  <button 
                    onClick={toggleEdit} 
                    className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg ${
                      isEditing 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700' 
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isEditing ? 'bg-white animate-pulse' : 'bg-white'}`}></span>
                    {isEditing ? 'Salir Edición' : 'Modo Edición'}
                  </button>

                  {/* Información de usuario */}
                  <div className="hidden md:flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {session.user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-sm font-medium text-gray-900">{session.user.email}</p>
                      <p className="text-xs text-gray-500">Usuario activo</p>
                    </div>
                  </div>

                  {/* Botón cerrar sesión */}
                  <button 
                    onClick={handleLogout}
                    className="hidden md:flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
                    title="Cerrar sesión"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden lg:inline">Salir</span>
                  </button>

                  {/* Menú móvil */}
                  <div className="md:hidden">
                    <button 
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Menú móvil expandido */}
          {isMenuOpen && session && (
            <div className="md:hidden border-t border-gray-200 py-4 animate-fade-in">
              <div className="space-y-2">
                <MobileNavLink href="/" label="Inicio" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink href="/indicadores" label="Indicadores" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink href="/metas" label="Metas" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink href="/avances" label="Avances" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink href="/reportes" label="Reportes" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink href="/formularios" label="Formularios" onClick={() => setIsMenuOpen(false)} />
                
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <button 
                    onClick={toggleEdit}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                      isEditing 
                        ? 'bg-red-500 text-white' 
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full bg-white ${isEditing ? 'animate-pulse' : ''}`}></span>
                    {isEditing ? 'Salir de Edición' : 'Activar Edición'}
                  </button>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 bg-red-50 rounded-lg font-medium hover:bg-red-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

// Componentes auxiliares para navegación
function NavLink({ href, label }) {
  return (
    <Link 
      href={href}
      className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200 hover:bg-blue-50"
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, onClick }) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors duration-200 hover:bg-blue-50"
    >
      {label}
    </Link>
  );
}
