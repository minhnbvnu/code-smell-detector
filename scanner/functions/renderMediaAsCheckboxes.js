function renderMediaAsCheckboxes(element, options = {}, checkboxland) {
  if (!canvasEl) {
    canvasEl = document.createElement('canvas');
    context = canvasEl.getContext('2d');
  }

  // Create a tiny canvas. Each pixel on the canvas will represent a checkbox.
  canvasEl.width = checkboxland.dimensions[0];
  canvasEl.height = checkboxland.dimensions[1];

  // Clear the canvas before applying a new image. We use a white rectangle
  // in order for PNGs with transparency to appear over a white background
  // (which seems to be most appropriate in the use-cases I can think of).
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvasEl.width, canvasEl.height);

  // Determine the ideal dimensions for our media, such that it fills
  // as much of the checkbox grid as possible without overflowing.
  const [mediaWidth, mediaHeight] = getMediaDimensions(element);
  const [width, height] = clampDimensions(mediaWidth, mediaHeight, canvasEl.width, canvasEl.height);

  // Draw the original image on the tiny canvas (`drawImage` will scale the
  // image as needed to make it fit the canvas).
  context.drawImage(element, 0, 0, width, height);

  // Loop over the canvas pixels and apply an image algorithm (like dithering or thresholding).
  const imageData = applyImageAlgorithm(context, width, height, options);

  const checkboxMatrix = convertImageDataToCheckboxMatrix(imageData);
  checkboxland.setData(checkboxMatrix, options);
}