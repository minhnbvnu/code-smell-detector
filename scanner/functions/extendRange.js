function extendRange(doc, range, head, other) {
  if (doc.cm && doc.cm.display.shift || doc.extend) {
    var anchor = range.anchor;
    if (other) {
      var posBefore = cmp(head, anchor) < 0;
      if (posBefore != (cmp(other, anchor) < 0)) {
        anchor = head;
        head = other;
      } else if (posBefore != (cmp(head, other) < 0)) {
        head = other;
      }
    }
    return new Range(anchor, head)
  } else {
    return new Range(other || head, head)
  }
}