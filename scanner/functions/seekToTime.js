function seekToTime(seconds) {
  return function (dispatch, getState) {
    const state = getState();
    const duration = getDuration(state);

    if (duration == null) {
      return;
    }

    dispatch({
      type: SEEK_TO_PERCENT_COMPLETE,
      percent: seconds / duration * 100
    });
  };
}