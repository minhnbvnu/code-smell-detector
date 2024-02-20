function tempTooltip(cm, content, ts) {
    if (cm.state.ternTooltip) remove(cm.state.ternTooltip);
    var where = cm.cursorCoords();
    var tip = cm.state.ternTooltip = makeTooltip(where.right + 1, where.bottom, content, cm);
    function maybeClear() {
      old = true;
      if (!mouseOnTip) clear();
    }
    function clear() {
      cm.state.ternTooltip = null;
      if (tip.parentNode) fadeOut(tip)
      clearActivity()
    }
    var mouseOnTip = false, old = false;
    CodeMirror.on(tip, "mousemove", function() { mouseOnTip = true; });
    CodeMirror.on(tip, "mouseout", function(e) {
      var related = e.relatedTarget || e.toElement
      if (!related || !CodeMirror.contains(tip, related)) {
        if (old) clear();
        else mouseOnTip = false;
      }
    });
    setTimeout(maybeClear, ts.options.hintDelay ? ts.options.hintDelay : 1700);
    var clearActivity = onEditorActivity(cm, clear)
  }