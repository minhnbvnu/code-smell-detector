function adjustVolume(volumeDiff) {
  return (dispatch, getState) => {
    const currentVolume = getState().media.volume;
    return dispatch(media_setVolume(currentVolume + volumeDiff));
  };
}