function _deletePropertySelection(tx, args) {
  var range = args.selection.getRange();
  var path = range.start.path;
  var startOffset = range.start.offset;
  var endOffset = range.end.offset;
  tx.update(path, { delete: { start: startOffset, end: endOffset } });
  Annotations.deletedText(tx, path, startOffset, endOffset);
  return {
    selection: tx.createSelection({
      type: 'property',
      path: path,
      startOffset: startOffset
    })
  };
}