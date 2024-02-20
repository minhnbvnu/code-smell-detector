function MouseZoneManager(_terminal) {
        var _this = this;
        this._terminal = _terminal;
        this._zones = [];
        this._areZonesActive = false;
        this._tooltipTimeout = null;
        this._currentZone = null;
        this._lastHoverCoords = [null, null];
        this._terminal.element.addEventListener('mousedown', function (e) { return _this._onMouseDown(e); });
        this._mouseMoveListener = function (e) { return _this._onMouseMove(e); };
        this._clickListener = function (e) { return _this._onClick(e); };
    }