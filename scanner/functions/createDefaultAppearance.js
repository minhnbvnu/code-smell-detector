function createDefaultAppearance({
  fontSize,
  fontName,
  fontColor
}) {
  let colorCmd;

  if (fontColor.every(c => c === 0)) {
    colorCmd = "0 g";
  } else {
    colorCmd = Array.from(fontColor).map(c => (c / 255).toFixed(2)).join(" ") + " rg";
  }

  return `/${(0, _core_utils.escapePDFName)(fontName)} ${fontSize} Tf ${colorCmd}`;
}