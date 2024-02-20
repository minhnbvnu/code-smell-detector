function queueFetchingMediaTags(id) {
  return (dispatch, getState) => {
    const track = getTracks(getState())[id];
    loadQueue.push(() => dispatch(fetchMediaTags(track.url, id)), () => {
      const trackIsVisible = getTrackIsVisibleFunction(getState());
      return trackIsVisible(id) ? META_DATA_VISIBLE_PRIORITY : META_DATA_PRIORITY;
    });
  };
}