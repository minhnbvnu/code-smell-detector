function Range(startCell, endCell) {
    _classCallCheck(this, Range);

    this._startCell = startCell;
    this._endCell = endCell;

    this._findRangeExtent(startCell, endCell);
  }