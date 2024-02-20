function renderBoxesInPageContainerLayer(layerClass, boxes, page, containerEl, rectClasses = null) {
  const mountedSvg = containerEl.querySelector(`.${layerClass}`);
  // Create the layer if it's not there
  const svg = mountedSvg || createSVGPageLayer(page, layerClass);
  if (!mountedSvg) {
    // Insert after the image if the image is already loaded.
    const imgEl = containerEl.querySelector('.BRpageimage');
    if (imgEl) $(svg).insertAfter(imgEl);
    else $(svg).prependTo(containerEl);
  }

  for (const [i, box] of boxes.entries()) {
    const rect = boxToSVGRect(box);
    if (rectClasses) {
      rect.setAttribute('class', rectClasses[i]);
    }
    svg.appendChild(rect);
  }
}