function fetchMediaDuration(url, id) {
  return (dispatch, getState) => {
    loadQueue.push(async () => {
      try {
        const duration = await genMediaDuration(url);
        dispatch({
          type: SET_MEDIA_DURATION,
          duration,
          id
        });
      } catch (e) {// TODO: Should we update the state to indicate that we don't know the length?
      }
    }, () => {
      const trackIsVisible = getTrackIsVisibleFunction(getState());
      return trackIsVisible(id) ? DURATION_VISIBLE_PRIORITY : DURATION_PRIORITY;
    });
  };
}