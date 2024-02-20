function CharMeasure(document, parentElement) {
        var _this = _super.call(this) || this;
        _this._document = document;
        _this._parentElement = parentElement;
        _this._measureElement = _this._document.createElement('span');
        _this._measureElement.style.position = 'absolute';
        _this._measureElement.style.top = '0';
        _this._measureElement.style.left = '-9999em';
        _this._measureElement.style.lineHeight = 'normal';
        _this._measureElement.textContent = 'W';
        _this._measureElement.setAttribute('aria-hidden', 'true');
        _this._parentElement.appendChild(_this._measureElement);
        return _this;
    }