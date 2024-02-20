function cropPlaylist() {
  return (dispatch, getState) => {
    const state = getState();

    if (getSelectedTrackObjects(state).length === 0) {
      return;
    }

    const selectedTrackIds = getSelectedTrackIds(state);
    const {
      playlist: {
        trackOrder
      }
    } = state;
    dispatch({
      type: REMOVE_TRACKS,
      // @ts-ignore The keys are numbers, but TypeScript does not trust us.
      // https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
      ids: trackOrder.filter(id => !selectedTrackIds.has(id))
    });
  };
}