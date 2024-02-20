function media_scrollVolume(e) {
  e.preventDefault();
  return (dispatch, getState) => {
    const currentVolume = getState().media.volume; // Using pixels as percentage difference here is a bit arbirary, but... oh well.

    return dispatch(media_setVolume(currentVolume + e.deltaY));
  };
}