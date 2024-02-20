function milkdrop_selectNextPreset(transitionType = TransitionType.DEFAULT) {
  return (dispatch, getState) => {
    const state = getState();

    if (getRandomizePresets(state)) {
      return dispatch(selectRandomPreset(transitionType));
    }

    const currentPresetIndex = getCurrentPresetIndex(state);

    if (currentPresetIndex == null) {
      return;
    }

    const nextPresetIndex = currentPresetIndex + 1;
    dispatch(milkdrop_requestPresetAtIndex(nextPresetIndex, transitionType, true));
  };
}