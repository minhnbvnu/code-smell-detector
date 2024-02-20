function loadPresets(presets) {
  return (dispatch, getState) => {
    const state = getState();
    const presetsLength = state.milkdrop.presets.length;
    dispatch({
      type: GOT_BUTTERCHURN_PRESETS,
      presets
    });

    if (presetsLength === 0 && getRandomizePresets(state)) {
      dispatch(selectRandomPreset());
    } else {
      dispatch(milkdrop_requestPresetAtIndex(presetsLength, TransitionType.IMMEDIATE, true));
    }
  };
}