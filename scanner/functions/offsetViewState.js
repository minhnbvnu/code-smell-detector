function offsetViewState(viewState, offset) {
  const shiftedViewState = {
    ...viewState,
    bearing: viewState.bearing + offset.bearing
  };

  const helperViewport = new WebMercatorViewport(shiftedViewState);

  const pos = [viewState.width / 2 + offset.x, viewState.height / 2 + offset.y];
  const lngLat = [viewState.longitude, viewState.latitude];

  const [longitude, latitude] = helperViewport.getLocationAtPoint({
    lngLat,
    pos
  });

  return {
    ...shiftedViewState,
    longitude,
    latitude
  };
}