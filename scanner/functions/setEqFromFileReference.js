function setEqFromFileReference(fileReference) {
  return async dispatch => {
    const arrayBuffer = await genArrayBufferFromFileReference(fileReference);
    const eqf = Object(winamp_eqf["parser"])(arrayBuffer);
    const preset = eqf.presets[0];
    dispatch(files_setEqFromObject(preset));
  };
}