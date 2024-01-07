constructor(symbols) {
        this._symbols = symbols;
        this._index = 0;
        this._last = 0;
        this._cur = (this._symbols.length > 0) ? this._symbols[0] : null;
        this._buf = [];
        this._mode = 'text';
        this._error = null;
    }