function media_nextN(n) {
  return (dispatch, getState) => {
    const nextTrackId = getNextTrackId(getState(), n);

    if (nextTrackId == null) {
      dispatch({
        type: IS_STOPPED
      });
      return;
    }

    dispatch(playTrack(nextTrackId));
  };
}