function media_seekForward(seconds) {
  return function (dispatch, getState) {
    const timeElapsed = getTimeElapsed(getState());
    dispatch(seekToTime(timeElapsed + seconds));
  };
}