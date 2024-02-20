function getViewStateOffset(oldViewState, viewState, oldOffset) {
  if (!oldViewState) {
    return oldOffset;
  }

  const oldViewport = new WebMercatorViewport(oldViewState);
  const oldPos = [oldViewport.width / 2 + oldOffset.x, oldViewport.height / 2 + oldOffset.y];
  const trackedLngLat = oldViewport.unproject(oldPos);

  const newViewport = new WebMercatorViewport(viewState);
  const newPos = newViewport.project(trackedLngLat);

  return {
    x: oldOffset.x + newPos[0] - oldPos[0],
    y: oldOffset.y + newPos[1] - oldPos[1],
    bearing: oldOffset.bearing + viewState.bearing - oldViewState.bearing
  };
}