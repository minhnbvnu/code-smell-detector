function milkdrop_requestPresetAtIndex(index, transitionType, addToHistory) {
  return async (dispatch, getState) => {
    const state = getState();
    const preset = state.milkdrop.presets[index];

    if (preset == null) {
      // Index might be out of range.
      return;
    }

    dispatch({
      type: PRESET_REQUESTED,
      index,
      addToHistory
    });

    switch (preset.type) {
      case "RESOLVED":
        dispatch({
          type: SELECT_PRESET_AT_INDEX,
          index,
          transitionType
        });
        return;

      case "UNRESOLVED":
        const json = await preset.getPreset(); // TODO: Ensure that this works correctly even if requests resolve out of order

        dispatch({
          type: RESOLVE_PRESET_AT_INDEX,
          index,
          json
        });
        dispatch({
          type: SELECT_PRESET_AT_INDEX,
          index,
          transitionType
        });
        return;
    }
  };
}