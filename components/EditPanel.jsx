'use client';
export default function EditPanel({ selectedElement, onStyleChange }) {
  if (!selectedElement) return null;

  return (
    <div className="fixed top-16 right-4 w-64 bg-white border rounded-lg shadow-lg p-4 z-50">
      <h3 className="text-sm font-bold mb-2">Editar estilo</h3>
      <div className="flex gap-2 mb-2">
        <button onClick={() => onStyleChange("bold")} className="px-2 py-1 border rounded">B</button>
        <button onClick={() => onStyleChange("italic")} className="px-2 py-1 border rounded italic">I</button>
        <button onClick={() => onStyleChange("underline")} className="px-2 py-1 border rounded underline">U</button>
      </div>
      <div className="mb-2">
        <label className="text-xs">Tamaño</label>
        <select onChange={(e) => onStyleChange("fontSize", e.target.value)} className="w-full border p-1 rounded">
          <option value="small">Pequeño</option>
          <option value="base">Normal</option>
          <option value="large">Grande</option>
          <option value="xlarge">Muy grande</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="text-xs">Alineación</label>
        <select onChange={(e) => onStyleChange("align", e.target.value)} className="w-full border p-1 rounded">
          <option value="left">Izquierda</option>
          <option value="center">Centro</option>
          <option value="right">Derecha</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="text-xs">Color</label>
        <input type="color" onChange={(e) => onStyleChange("color", e.target.value)} className="w-full h-8 rounded" />
      </div>
    </div>
  );
}
