// pages/index.jsx
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Bienvenido a la App de Residuos</h1>
        <p className="text-lg">
          Esta es la página principal. Usa la navegación para ir a Metas,
          Avances e Indicadores.
        </p>
      </main>
    </>
  );
}
