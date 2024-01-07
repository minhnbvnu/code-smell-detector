function normalizeBlendMode(value, parsingArray = false) {
  if (Array.isArray(value)) {
    for (let i = 0, ii = value.length; i < ii; i++) {
      const maybeBM = normalizeBlendMode(value[i], true);

      if (maybeBM) {
        return maybeBM;
      }
    }

    (0, _util.warn)(`Unsupported blend mode Array: ${value}`);
    return "source-over";
  }

  if (!(0, _primitives.isName)(value)) {
    if (parsingArray) {
      return null;
    }

    return "source-over";
  }

  switch (value.name) {
    case "Normal":
    case "Compatible":
      return "source-over";

    case "Multiply":
      return "multiply";

    case "Screen":
      return "screen";

    case "Overlay":
      return "overlay";

    case "Darken":
      return "darken";

    case "Lighten":
      return "lighten";

    case "ColorDodge":
      return "color-dodge";

    case "ColorBurn":
      return "color-burn";

    case "HardLight":
      return "hard-light";

    case "SoftLight":
      return "soft-light";

    case "Difference":
      return "difference";

    case "Exclusion":
      return "exclusion";

    case "Hue":
      return "hue";

    case "Saturation":
      return "saturation";

    case "Color":
      return "color";

    case "Luminosity":
      return "luminosity";
  }

  if (parsingArray) {
    return null;
  }

  (0, _util.warn)(`Unsupported blend mode: ${value.name}`);
  return "source-over";
}