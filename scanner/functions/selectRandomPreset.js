function selectRandomPreset(transitionType = TransitionType.DEFAULT) {
  return (dispatch, getState) => {
    const state = getState(); // TODO: Make this a selector.

    const randomIndex = Math.floor(Math.random() * state.milkdrop.presets.length);
    dispatch(milkdrop_requestPresetAtIndex(randomIndex, transitionType, true));
  };
}