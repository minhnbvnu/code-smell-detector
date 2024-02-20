function reapplyEffectsInSVG(svg) {
  var rxp = /id="Z-(-[^"]+)"/g;
  var opacityRxp = /-opacity([0-9]+)/;
  var multiplyRxp = /-multiply/;
  function replace(a, b) {
    var style = '', retn;
    if (multiplyRxp.test(b)) {
      style += 'mix-blend-mode:multiply;';
      b = b.replace(multiplyRxp, '');
    }
    if (opacityRxp.test(b)) {
      style += 'opacity:' + parseOpacity(b) + ';';
      b = b.replace(opacityRxp, '');
    }
    retn = 'style="' + style + '"';
    if (b.indexOf('--') === 0) {
      // restore original id
      retn = 'id="' + b.substr(2) + '" ' + retn;
    }
    return retn;
  }

  function parseOpacity(str) {
    var found = str.match(opacityRxp);
    return parseInt(found[1]) / 100;
  }
  return svg.replace(rxp, replace);
}