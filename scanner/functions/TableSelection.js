function TableSelection(properties) {
  this.tableId = properties.tableId;
  if (properties.rectangle) {
    this.rectangle = properties.rectangle;
  } else {
    this.rectangle = new TableSelection.Rectangle(properties.startRow, properties.startCol,
      properties.endRow, properties.endCol);
  }
  if (!this.tableId) {
    throw new Error('Invalid arguments. `tableId` is mandatory.');
  }
  this._internal = {};
  Object.freeze(this);
}