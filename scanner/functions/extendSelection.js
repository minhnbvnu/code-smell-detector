function extendSelection(doc, head, other, options) {
  setSelection(doc, new Selection([extendRange(doc, doc.sel.primary(), head, other)], 0), options);
}