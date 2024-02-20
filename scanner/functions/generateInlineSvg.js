function generateInlineSvg(imgPath, imgClass, imgStyle, settings) {
  var svg = readFile(imgPath) || '';
  var attr = ' class="' + imgClass + '"';
  if (imgStyle) {
    attr += ' style="' + imgStyle + '"';
  }
  svg = svg.replace(/<\?xml.*?\?>/, '');
  svg = svg.replace('<svg', '<svg' + attr);
  svg = replaceSvgIds(svg, settings.svg_id_prefix);
  return svg;
}