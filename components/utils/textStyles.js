// Funciones para aplicar estilos globales o sobre selección
export function applyStyleToSelection(style) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  if (selection.isCollapsed) {
    // No hay sombreo → aplicamos al contenedor
    const parent = range.startContainer.parentNode;
    Object.assign(parent.style, style);
  } else {
    // Hay sombreo → aplicar solo al rango
    const span = document.createElement("span");
    Object.assign(span.style, style);
    range.surroundContents(span);
  }
}

export function applyStyleToElement(element, style) {
  if (!element) return;
  Object.assign(element.style, style);
}
