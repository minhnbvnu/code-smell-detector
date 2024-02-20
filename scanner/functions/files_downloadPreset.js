function files_downloadPreset() {
  return (dispatch, getState) => {
    const state = getState();
    const data = getEqfData(state);
    const arrayBuffer = Object(winamp_eqf["creator"])(data);
    const base64 = base64FromArrayBuffer(arrayBuffer);
    const dataURI = `data:application/zip;base64,${base64}`;
    downloadURI(dataURI, "entry.eqf");
  };
}