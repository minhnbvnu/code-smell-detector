async function getPlaylistStyle(zip) {
  const files = zip.file(getFilenameRegex("PLEDIT", "txt"));
  const file = files[0];

  if (file == null) {
    return DEFAULT_SKIN.playlistStyle;
  }

  const ini = await file.async("text");

  if (ini == null) {
    return DEFAULT_SKIN.playlistStyle;
  }

  const data = ini && parseIni(ini).text;

  if (!data) {
    // Corrupt or missing PLEDIT.txt file.
    return DEFAULT_SKIN.playlistStyle;
  } // Winamp seems to permit colors that contain too many characters.
  // For compatibility with existing skins, we normalize them here.


  ["normal", "current", "normalbg", "selectedbg", "mbFG", "mbBG"].forEach(colorKey => {
    let color = data[colorKey];

    if (!color) {
      return;
    }

    if (color[0] !== "#") {
      color = `#${color}`;
    }

    data[colorKey] = color.slice(0, 7);
  });
  return skinParserUtils_objectSpread(skinParserUtils_objectSpread({}, DEFAULT_SKIN.playlistStyle), data);
}