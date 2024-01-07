constructor(content, coordinates, options = {}) {
        super(coordinates, options);
        if (options.textSymbol) {
            this.setTextSymbol(options.textSymbol);
        }
        if (options.boxStyle) {
            this.setBoxStyle(options.boxStyle);
        }
        this._content = escapeSpecialChars(content);
        this._refresh();
    }