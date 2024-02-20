async function skinParser(zipFileBuffer, JSZip) {
  const zip = await JSZip.loadAsync(zipFileBuffer);
  const [colors, playlistStyle, images, cursors, region, genTextSprites, genExColors] = await Promise.all([genVizColors(zip), getPlaylistStyle(zip), genImages(zip), genCursors(zip), genRegion(zip), genGenTextSprites(zip), getGenExColors(zip)]);
  const [genLetterWidths, genTextImages] = genTextSprites || [null, {}];
  return {
    colors,
    playlistStyle,
    images: skinParser_objectSpread(skinParser_objectSpread({}, images), genTextImages),
    genLetterWidths,
    cursors,
    region,
    genExColors
  };
}