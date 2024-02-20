async function genVizColors(zip) {
  const viscolor = await getFileFromZip(zip, "VISCOLOR", "txt", "text");
  return viscolor ? parseViscolors(viscolor.contents) : DEFAULT_SKIN.colors;
}