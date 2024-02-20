function EditCellInSelectedRow(columnName) {
  let row = signonsTree.currentIndex;
  let columnElement = getColumnByName(columnName);
  signonsTree.startEditing(
    row,
    signonsTree.columns.getColumnFor(columnElement)
  );
}