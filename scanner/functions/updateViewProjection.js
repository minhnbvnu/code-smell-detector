function updateViewProjection() {
  const newProj = getProjection(viewProjSelect.value);
  const newProjExtent = newProj.getExtent();
  const newView = new View({
    projection: newProj,
    center: getCenter(newProjExtent || [0, 0, 0, 0]),
    zoom: 0,
    extent: newProjExtent || undefined,
  });
  map.setView(newView);

  // Example how to prevent double occurrence of map by limiting layer extent
  if (newProj.isGlobal()) {
    layers['bng'].setExtent(
      transformExtent(proj27700.getExtent(), proj27700, newProj, 2),
    );
  } else {
    layers['bng'].setExtent(undefined);
  }
}