function triggerElectric(cm, inserted) {
  // When an 'electric' character is inserted, immediately trigger a reindent
  if (!cm.options.electricChars || !cm.options.smartIndent) { return }
  var sel = cm.doc.sel;

  for (var i = sel.ranges.length - 1; i >= 0; i--) {
    var range = sel.ranges[i];
    if (range.head.ch > 100 || (i && sel.ranges[i - 1].head.line == range.head.line)) { continue }
    var mode = cm.getModeAt(range.head);
    var indented = false;
    if (mode.electricChars) {
      for (var j = 0; j < mode.electricChars.length; j++)
        { if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
          indented = indentLine(cm, range.head.line, "smart");
          break
        } }
    } else if (mode.electricInput) {
      if (mode.electricInput.test(getLine(cm.doc, range.head.line).text.slice(0, range.head.ch)))
        { indented = indentLine(cm, range.head.line, "smart"); }
    }
    if (indented) { signalLater(cm, "electricInput", cm, range.head.line); }
  }
}