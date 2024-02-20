function prepareSelection(cm, primary) {
  var doc = cm.doc, result = {};
  var curFragment = result.cursors = document.createDocumentFragment();
  var selFragment = result.selection = document.createDocumentFragment();

  for (var i = 0; i < doc.sel.ranges.length; i++) {
    if (primary === false && i == doc.sel.primIndex) { continue }
    var range = doc.sel.ranges[i];
    if (range.from().line >= cm.display.viewTo || range.to().line < cm.display.viewFrom) { continue }
    var collapsed = range.empty();
    if (collapsed || cm.options.showCursorWhenSelecting)
      { drawSelectionCursor(cm, range.head, curFragment); }
    if (!collapsed)
      { drawSelectionRange(cm, range, selFragment); }
  }
  return result
}