async function getGenExColors(zip) {
  const img = await getImgFromFilename(zip, "GENEX");

  if (img == null) {
    return null;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context == null) {
    return null;
  }

  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0);

  const getColorAt = x => `rgb(${context.getImageData(x, 0, 1, 1) // Discard the alpha channel
  .data.slice(0, 3).join(",")})`; // Ideally we would just have a map from key to the x value and map over
  // that with getColorAt, but I don't know a great way to make that type
  // safe. So, we'll just do this for now, where we explicitly call getColorAt
  // for each key.


  return {
    // (1) x=48: item background (background to edits, listviews, etc.)
    itemBackground: getColorAt(48),
    // (2) x=50: item foreground (text colour of edits, listviews, etc.)
    itemForeground: getColorAt(50),
    // (3) x=52: window background (used to set the bg color for the dialog)
    windowBackground: getColorAt(52),
    // (4) x=54: button text colour
    buttonText: getColorAt(54),
    // (5) x=56: window text colour
    windowText: getColorAt(56),
    // (6) x=58: colour of dividers and sunken borders
    divider: getColorAt(58),
    // (7) x=60: selection colour for entries inside playlists (nothing else yet)
    playlistSelection: getColorAt(60),
    // (8) x=62: listview header background colour
    listHeaderBackground: getColorAt(62),
    // (9) x=64: listview header text colour
    listHeaderText: getColorAt(64),
    // (10) x=66: listview header frame top and left colour
    listHeaderFrameTopAndLeft: getColorAt(66),
    // (11) x=68: listview header frame bottom and right colour
    listHeaderFrameBottomAndRight: getColorAt(68),
    // (12) x=70: listview header frame colour, when pressed
    listHeaderFramePressed: getColorAt(70),
    // (13) x=72: listview header dead area colour
    listHeaderDeadArea: getColorAt(72),
    // (14) x=74: scrollbar colour #1
    scrollbarOne: getColorAt(74),
    // (15) x=76: scrollbar colour #2
    scrollbarTwo: getColorAt(76),
    // (16) x=78: pressed scrollbar colour #1
    pressedScrollbarOne: getColorAt(78),
    // (17) x=80: pressed scrollbar colour #2
    pressedScrollbarTwo: getColorAt(80),
    // (18) x=82: scrollbar dead area colour
    scrollbarDeadArea: getColorAt(82),
    // (19) x=84 List view text colour highlighted
    listTextHighlighted: getColorAt(84),
    // (20) x=86 List view background colour highlighted
    listTextHighlightedBackground: getColorAt(86),
    // (21) x=88 List view text colour selected
    listTextSelected: getColorAt(88),
    // (22) x=90 List view background colour selected
    listTextSelectedBackground: getColorAt(90)
  };
}