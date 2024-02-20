function parseSvg(str) {
  // get top level element
  var svgTag = (str.match(SVG_HEADER_RE) || [ '' ])[0];

  // test if top level element is <svg>
  if (!SVG_TAG_RE.test(svgTag)) return;

  var attrs  = svgAttrs(svgTag);
  var width  = parseFloat(attrs.width);
  var height = parseFloat(attrs.height);

  // Extract from direct values

  if (attrs.width && attrs.height) {
    if (!isFinitePositive(width) || !isFinitePositive(height)) return;

    return {
      width:  width,
      height: height,
      type:   'svg',
      mime:   'image/svg+xml',
      wUnits: units(attrs.width),
      hUnits: units(attrs.height)
    };
  }

  // Extract from viewbox

  var parts = (attrs.viewbox || '').split(' ');
  var viewbox = {
    width:  parts[2],
    height: parts[3]
  };
  var vbWidth  = parseFloat(viewbox.width);
  var vbHeight = parseFloat(viewbox.height);

  if (!isFinitePositive(vbWidth) || !isFinitePositive(vbHeight)) return;
  if (units(viewbox.width) !== units(viewbox.height)) return;

  var ratio = vbWidth / vbHeight;

  if (attrs.width) {
    if (!isFinitePositive(width)) return;

    return {
      width:  width,
      height: width / ratio,
      type:   'svg',
      mime:   'image/svg+xml',
      wUnits: units(attrs.width),
      hUnits: units(attrs.width)
    };
  }

  if (attrs.height) {
    if (!isFinitePositive(height)) return;

    return {
      width:  height * ratio,
      height: height,
      type:   'svg',
      mime:   'image/svg+xml',
      wUnits: units(attrs.height),
      hUnits: units(attrs.height)
    };
  }

  return {
    width:  vbWidth,
    height: vbHeight,
    type:   'svg',
    mime:   'image/svg+xml',
    wUnits: units(viewbox.width),
    hUnits: units(viewbox.height)
  };
}