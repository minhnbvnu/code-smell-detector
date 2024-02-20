function SelectionManager(_terminal, _charMeasure) {
        var _this = _super.call(this) || this;
        _this._terminal = _terminal;
        _this._charMeasure = _charMeasure;
        _this._enabled = true;
        _this._initListeners();
        _this.enable();
        _this._model = new SelectionModel_1.SelectionModel(_terminal);
        _this._activeSelectionMode = SelectionMode.NORMAL;
        return _this;
    }