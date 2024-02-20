function removeSelectedTracks() {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_TRACKS,
      // @ts-ignore The keys are numbers, but TypeScript does not trust us.
      // https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
      ids: Array.from(getSelectedTrackIds(getState()))
    });
  };
}