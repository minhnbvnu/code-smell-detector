function getWorldParameters(frameState, layer) {
  const projection = frameState.viewState.projection;

  const vectorSource = layer.getSource();
  const multiWorld = vectorSource.getWrapX() && projection.canWrapX();
  const projectionExtent = projection.getExtent();

  const extent = frameState.extent;
  const worldWidth = multiWorld ? getWidth(projectionExtent) : null;
  const endWorld = multiWorld
    ? Math.ceil((extent[2] - projectionExtent[2]) / worldWidth) + 1
    : 1;

  const startWorld = multiWorld
    ? Math.floor((extent[0] - projectionExtent[0]) / worldWidth)
    : 0;

  return [startWorld, endWorld, worldWidth];
}