function rewriteSVGFile(path, id) {
  var svg = readFile(path);
  var selector;
  if (!svg) return;
  // replace id created by Illustrator (relevant for inline SVG)
  svg = svg.replace(/id="[^"]*"/, 'id="' + id + '"');
  // reapply opacity and multiply effects
  svg = reapplyEffectsInSVG(svg);
  // prevent SVG strokes from scaling
  // (add element id to selector to prevent inline SVG from affecting other SVG on the page)
  selector = map('rect,circle,path,line,polyline,polygon'.split(','), function(name) {
      return '#' + id + ' ' + name;
    }).join(', ');
  svg = injectCSSinSVG(svg, selector + ' { vector-effect: non-scaling-stroke; }');
  // remove images from filesystem and SVG file
  svg = removeImagesInSVG(svg, path);
  saveTextFile(path, svg);
}