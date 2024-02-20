function getBasicSymbolCss(geom, style, abBox, opts) {
  var center = geom.center;
  var styles = [];
  // Round fixed-size symbols to integer size, to prevent pixel-snapping from
  // changing squares and circles to rectangles and ovals.
  var precision = opts.scaled ? 1 : 0;
  var width, height;
  var border;

  if (geom.type == 'line') {
    precision = 2;
    width = geom.width;
    height = geom.height;
    if (width > height) {
      // kludge to minimize gaps between segments (found using trial and error)
      width += style.strokeWidth * 0.5;
      center[0] += style.strokeWidth * 0.333;
    }
  } else if (geom.type == 'rectangle') {
    width = geom.width;
    height = geom.height;
  } else if (geom.type == 'circle') {
    width = geom.radius * 2;
    height = width;
    // styles.push('border-radius: ' + roundTo(geom.radius, 1) + 'px');
    styles.push('border-radius: 50%');
  }

  width = roundTo(width, precision);
  height = roundTo(height, precision);

  if (opts.scaled) {
    styles.push('width: ' + formatCssPct(width, abBox.width));
    styles.push('height: ' + formatCssPct(height, abBox.height));
    styles.push('margin-left: ' + formatCssPct(-width / 2, abBox.width));
    // vertical margin pct is calculated as pct of width
    styles.push('margin-top: ' + formatCssPct(-height / 2, abBox.width));

  } else {
    styles.push('width: ' + width + 'px');
    styles.push('height: ' + height + 'px');
    styles.push('margin-top: ' + (-height / 2) + 'px');
    styles.push('margin-left: ' + (-width / 2) + 'px');
  }

  if (style.stroke) {
    if (geom.type == 'line' && width > height) {
      border = 'border-top';
    } else if (geom.type == 'line') {
      border = 'border-right';
    } else {
      border = 'border';
    }
    styles.push(border + ': ' + style.strokeWidth + 'px solid ' + style.stroke);
  }
  if (style.fill) {
    styles.push('background-color: ' + style.fill);
  }
  if (style.opacity < 1 && style.opacity) {
    styles.push('opacity: ' + style.opacity);
  }
  if (style.multiply) {
    styles.push('mix-blend-mode: multiply');
  }
  styles.push('left: ' + formatCssPct(center[0], abBox.width));
  styles.push('top: ' + formatCssPct(center[1], abBox.height));
  // TODO: use class for colors and other properties
  return 'style="' + styles.join('; ') + ';"';
}