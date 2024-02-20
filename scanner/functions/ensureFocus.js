function ensureFocus(cm) {
  if (!cm.state.focused) { cm.display.input.focus(); onFocus(cm); }
}