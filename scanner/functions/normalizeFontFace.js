function normalizeFontFace(fontFace) {
  var family = fontFace.family.replace(/"|'/g, "").toLowerCase();

  var style = normalizeFontStyle(fontFace.style);
  var weight = normalizeFontWeight(fontFace.weight);
  var stretch = normalizeFontStretch(fontFace.stretch);

  return {
    family: family,
    style: style,
    weight: weight,
    stretch: stretch,
    src: fontFace.src || [],

    // The ref property maps this font-face to the font
    // added by the .addFont() method.
    ref: fontFace.ref || {
      name: family,
      style: [stretch, style, weight].join(" ")
    }
  };
}