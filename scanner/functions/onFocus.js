function onFocus(cm, e) {
  if (cm.state.delayingBlurEvent) { cm.state.delayingBlurEvent = false; }

  if (cm.options.readOnly == "nocursor") { return }
  if (!cm.state.focused) {
    signal(cm, "focus", cm, e);
    cm.state.focused = true;
    addClass(cm.display.wrapper, "CodeMirror-focused");
    // This test prevents this from firing when a context
    // menu is closed (since the input reset would kill the
    // select-all detection hack)
    if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
      cm.display.input.reset();
      if (webkit) { setTimeout(function () { return cm.display.input.reset(true); }, 20); } // Issue #1730
    }
    cm.display.input.receivedFocus();
  }
  restartBlink(cm);
}