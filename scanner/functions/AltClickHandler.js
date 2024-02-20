function AltClickHandler(_mouseEvent, _terminal) {
        this._mouseEvent = _mouseEvent;
        this._terminal = _terminal;
        this._lines = this._terminal.buffer.lines;
        this._startCol = this._terminal.buffer.x;
        this._startRow = this._terminal.buffer.y;
        _a = this._terminal.mouseHelper.getCoords(this._mouseEvent, this._terminal.element, this._terminal.charMeasure, this._terminal.options.lineHeight, this._terminal.cols, this._terminal.rows, false).map(function (coordinate) {
            return coordinate - 1;
        }), this._endCol = _a[0], this._endRow = _a[1];
        var _a;
    }