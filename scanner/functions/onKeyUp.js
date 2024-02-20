function onKeyUp(e) {
  if (e.keyCode == 16) { this.doc.sel.shift = false; }
  signalDOMEvent(this, e);
}