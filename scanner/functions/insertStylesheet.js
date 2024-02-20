function insertStylesheet() {
  const content = `
    .ember-inspector-render-highlight {
      border: 2px solid rgba(255,0,0,0.2);
      box-shadow: 0px 0px 1px rgba(255,0,0,0.2);
      z-index: 1000000;
      pointer-events: none;
    }
  `;
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(content));
  document.head.appendChild(style);
  return style;
}