function domTextBetween(cm, from, to, fromLine, toLine) {
  var text = "", closing = false, lineSep = cm.doc.lineSeparator();
  function recognizeMarker(id) { return function (marker) { return marker.id == id; } }
  function walk(node) {
    if (node.nodeType == 1) {
      var cmText = node.getAttribute("cm-text");
      if (cmText != null) {
        if (cmText == "") { text += node.textContent.replace(/\u200b/g, ""); }
        else { text += cmText; }
        return
      }
      var markerID = node.getAttribute("cm-marker"), range;
      if (markerID) {
        var found = cm.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
        if (found.length && (range = found[0].find()))
          { text += getBetween(cm.doc, range.from, range.to).join(lineSep); }
        return
      }
      if (node.getAttribute("contenteditable") == "false") { return }
      for (var i = 0; i < node.childNodes.length; i++)
        { walk(node.childNodes[i]); }
      if (/^(pre|div|p)$/i.test(node.nodeName))
        { closing = true; }
    } else if (node.nodeType == 3) {
      var val = node.nodeValue;
      if (!val) { return }
      if (closing) {
        text += lineSep;
        closing = false;
      }
      text += val;
    }
  }
  for (;;) {
    walk(from);
    if (from == to) { break }
    from = from.nextSibling;
  }
  return text
}