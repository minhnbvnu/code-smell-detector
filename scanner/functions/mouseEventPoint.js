function mouseEventPoint(mouseEvent, container) {
  const rect = container.getBoundingClientRect();
  return new Point(
    mouseEvent.clientX - rect.left - (container.clientLeft || 0),
    mouseEvent.clientY - rect.top - (container.clientTop || 0)
  );
}