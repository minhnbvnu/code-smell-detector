function createDIVPageLayer(page, className) {
  const div = document.createElement("div");
  div.style.width = `${page.width}px`;
  div.style.height = `${page.height}px`;
  div.setAttribute('class', `BRPageLayer ${className}`);
  return div;
}