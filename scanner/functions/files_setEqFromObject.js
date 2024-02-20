function files_setEqFromObject(preset) {
  return dispatch => {
    dispatch(setPreamp(normalizeEqBand(preset.preamp)));
    BANDS.forEach(band => {
      // @ts-ignore band and EqfPreset align
      dispatch(setEqBand(band, normalizeEqBand(preset[`hz${band}`])));
    });
  };
}