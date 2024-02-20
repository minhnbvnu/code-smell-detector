function TableMatrix(tableNode) {
  this.tableNode = tableNode;
  // Do not access these directly as they get invalidated on structural changes
  // Use the accessor methods instead.
  this._matrix = null;
  this._rowNodes = null;
}