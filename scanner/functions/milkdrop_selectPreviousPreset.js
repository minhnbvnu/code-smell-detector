function milkdrop_selectPreviousPreset(transitionType = TransitionType.DEFAULT) {
  return (dispatch, getState) => {
    const state = getState();
    const {
      presetHistory
    } = state.milkdrop;

    if (presetHistory.length < 1) {
      return;
    } // Awkward. We do -2 becuase the the last track is the current track.


    const lastPresetIndex = presetHistory[presetHistory.length - 2];
    dispatch(milkdrop_requestPresetAtIndex(lastPresetIndex, transitionType, false));
  };
}