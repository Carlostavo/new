'use client';
import { useState, useEffect } from 'react';

export default function EditPanel({ isOpen, onClose, onApplyStyles, selectedElement }) {
  const [activeStyles, setActiveStyles] = useState({
    bold: false, italic: false, underline: false, color: '#000000', fontSize: 'medium', align: 'left'
  });

  const colors = ['#000000', '#374151', '#6b7280', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff'];

  useEffect(() => {
    setActiveStyles(selectedElement?.styles || { bold: false, italic: false, underline: false, color: '#000000', fontSize: 'medium', align: 'left' });
  }, [selectedElement]);

  const toggleStyle = (style) => setActiveStyles({ ...activeStyles, [style]: !activeStyles[style] });
  const apply = () => selectedElement && onApplyStyles?.(selectedElement.id, activeStyles);

  return (
    <div className={`fixed top-0 right-0 w-72 bg-gray-900 text-white h-full shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-sm font-semibold">Editor</h2>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-xs mb-1">Texto seleccionado</h3>
          <p className="text-gray-300 text-xs">{selectedElement?.text || "Nada seleccionado"}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => toggleStyle('bold')} className={`px-2 py-1 rounded ${activeStyles.bold ? 'bg-blue-500' : 'bg-gray-700'}`}>B</button>
          <button onClick={() => toggleStyle('italic')} className={`px-2 py-1 rounded ${activeStyles.italic ? 'bg-blue-500' : 'bg-gray-700'}`}>I</button>
          <button onClick={() => toggleStyle('underline')} className={`px-2 py-1 rounded ${activeStyles.underline ? 'bg-blue-500' : 'bg-gray-700'}`}>U</button>
        </div>

        <div>
          <h3 className="text-xs mb-1">Colores</h3>
          <div className="flex flex-wrap gap-1">
            {colors.map((c) => (
              <button key={c} onClick={() => setActiveStyles({ ...activeStyles, color: c })} style={{ background: c }} className={`w-6 h-6 rounded ${activeStyles.color === c ? 'ring-2 ring-white' : ''}`} />
            ))}
          </div>
        </div>

        <button onClick={apply} className="w-full py-2 bg-green-600 rounded">Aplicar</button>
      </div>
    </div>
  );
}
