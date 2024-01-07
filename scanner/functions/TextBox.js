constructor(content, coordinates, width, height, options = {}) {
        super(coordinates, options);
        this._content = escapeSpecialChars(content);
        this._width = isNil(width) ? 100 : width;
        this._height = isNil(height) ? 40 : height;
        if (options.boxSymbol) {
            this.setBoxSymbol(options.boxSymbol);
        }
        if (options.textStyle) {
            this.setTextStyle(options.textStyle);
        }
        this._refresh();
    }