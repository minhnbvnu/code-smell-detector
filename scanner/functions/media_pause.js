function media_pause() {
  return (dispatch, getState) => {
    const {
      status
    } = getState().media;

    if (status === MEDIA_STATUS.PLAYING) {
      dispatch({
        type: PAUSE
      });
    } else {
      dispatch({
        type: PLAY
      });
    }
  };
}