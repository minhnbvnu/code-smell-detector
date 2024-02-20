function initializePresets(presetOptions) {
  return async dispatch => {
    const {
      getPresets,
      importButterchurn
    } = presetOptions;
    importButterchurn().then(butterchurn => {
      dispatch({
        type: GOT_BUTTERCHURN,
        butterchurn: butterchurn.default
      });
    });
    const presets = await getPresets();
    const normalizePresets = presets.map(normalizePresetTypes);
    dispatch(loadPresets(normalizePresets));
  };
}