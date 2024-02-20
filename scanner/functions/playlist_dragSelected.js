function playlist_dragSelected(offset) {
  return (dispatch, getState) => {
    const state = getState();
    const tracks = getTracks(state);
    const trackOrder = getTrackOrder(state);
    const selectedIds = getSelectedTrackIds(state);
    const firstSelected = trackOrder.findIndex(trackId => tracks[trackId] && selectedIds.has(trackId));

    if (firstSelected === -1) {
      return;
    }

    const lastSelected = findLastIndex(trackOrder, trackId => tracks[trackId] && selectedIds.has(trackId));

    if (lastSelected === -1) {
      throw new Error("We found a first selected, but not a last selected.");
    } // Ensure we don't try to drag off either end.


    const min = -firstSelected;
    const max = trackOrder.length - 1 - lastSelected;
    const normalizedOffset = clamp(offset, min, max);

    if (normalizedOffset !== 0) {
      dispatch({
        type: DRAG_SELECTED,
        offset: normalizedOffset
      });
    }
  };
}