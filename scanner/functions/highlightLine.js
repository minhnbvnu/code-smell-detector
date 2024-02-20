function highlightLine(cm, line, state, forceToEnd) {
  // A styles array always starts with a number identifying the
  // mode/overlays that it is based on (for easy invalidation).
  var st = [cm.state.modeGen], lineClasses = {};
  // Compute the base array of styles
  runMode(cm, line.text, cm.doc.mode, state, function (end, style) { return st.push(end, style); },
    lineClasses, forceToEnd);

  // Run overlays, adjust style array.
  var loop = function ( o ) {
    var overlay = cm.state.overlays[o], i = 1, at = 0;
    runMode(cm, line.text, overlay.mode, true, function (end, style) {
      var start = i;
      // Ensure there's a token end at the current position, and that i points at it
      while (at < end) {
        var i_end = st[i];
        if (i_end > end)
          { st.splice(i, 1, end, st[i+1], i_end); }
        i += 2;
        at = Math.min(end, i_end);
      }
      if (!style) { return }
      if (overlay.opaque) {
        st.splice(start, i - start, end, "overlay " + style);
        i = start + 2;
      } else {
        for (; start < i; start += 2) {
          var cur = st[start+1];
          st[start+1] = (cur ? cur + " " : "") + "overlay " + style;
        }
      }
    }, lineClasses);
  };

  for (var o = 0; o < cm.state.overlays.length; ++o) { loop( o ); }

  return {styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null}
}