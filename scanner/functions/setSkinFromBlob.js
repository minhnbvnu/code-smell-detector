function setSkinFromBlob(blob) {
  return async (dispatch, getState, {
    requireJSZip
  }) => {
    if (!requireJSZip) {
      alert("Webamp has not been configured to support custom skins.");
      return;
    }

    dispatch({
      type: LOADING
    });
    let JSZip;

    try {
      JSZip = await requireJSZip();
    } catch (e) {
      console.error(e);
      dispatch({
        type: LOADED
      });
      alert("Failed to load the skin parser.");
      return;
    }

    try {
      const skinData = await js_skinParser(blob, JSZip);
      dispatch({
        type: SET_SKIN_DATA,
        data: {
          skinImages: skinData.images,
          skinColors: skinData.colors,
          skinPlaylistStyle: skinData.playlistStyle,
          skinCursors: skinData.cursors,
          skinRegion: skinData.region,
          skinGenLetterWidths: skinData.genLetterWidths,
          skinGenExColors: skinData.genExColors
        }
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: LOADED
      });
      alert(`Failed to parse skin`);
    }
  };
}