import { useState } from "react";
import Navbar from "../components/Navbar";
import EditableText from "../components/EditableText";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newValue) => {
    console.log("Texto guardado:", newValue);
  };

  const features = [
    {
      title: "📊 Indicadores",
      description: "Monitorea los principales indicadores de gestión de residuos",
      link: "/indicadores",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "🎯 Metas",
      description: "Establece y sigue el cumplimiento de tus objetivos",
      link: "/metas",
      color: "bg-green-50 border-green-200"
    },
    {
      title: "📈 Avances",
      description: "Visualiza el progreso de tus iniciativas sostenibles",
      link: "/avances",
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "📋 Reportes",
      description: "Genera reportes detallados y personalizados",
      link: "/reportes",
      color: "bg-orange-50 border-orange-200"
    },
    {
      title: "📝 Formularios",
      description: "Gestiona formularios de recolección de datos",
      link: "/formularios",
      color: "bg-red-50 border-red-200"
    }
  ];

  return (
    <div>
      <Navbar onToggleEdit={setIsEditing} />
      <main className="max-w-6xl mx-auto mt-8 p-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-8 mb-8 text-center">
          <EditableText
            text="Sistema de Gestión de Residuos Sólidos"
            tag="h1"
            isEditing={isEditing}
            onSave={handleSave}
            className="text-3xl font-bold text-gray-800 mb-4"
          />
          <EditableText
            text="Monitorea indicadores, gestiona metas y genera reportes de sostenibilidad para una gestión eficiente de residuos."
            tag="p"
            isEditing={isEditing}
            onSave={handleSave}
            className="text-lg text-gray-600"
          />
        </div>

        {/* Tarjetas de características */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <a 
              key={index}
              href={feature.link}
              className="block transform transition-transform hover:scale-105"
            >
              <div className={`${feature.color} border-2 rounded-xl p-6 h-full shadow-sm hover:shadow-md transition-shadow`}>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="mt-4 flex items-center text-blue-600 font-medium">
                  <span>Acceder</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Estadísticas rápidas */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">95%</div>
            <div className="text-gray-600">Indicadores activos</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600">78%</div>
            <div className="text-gray-600">Metas cumplidas</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">24/7</div>
            <div className="text-gray-600">Sistema disponible</div>
          </div>
        </div>
      </main>
    </div>
  );
}
