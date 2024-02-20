function playlist_sortListByTitle() {
  return (dispatch, getState) => {
    const state = getState();
    const tracks = getTracks(state);
    const trackOrder = sort(getTrackOrder(state), i => `${tracks[i].title}`.toLowerCase());
    return dispatch({
      type: SET_TRACK_ORDER,
      trackOrder
    });
  };
}