function createSVGPageLayer(page, className) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("viewBox", `0 0 ${page.width} ${page.height}`);
  svg.setAttribute('class', `BRPageLayer ${className}`);
  svg.setAttribute('preserveAspectRatio', 'none');
  return svg;
}