constructor(symbol, geometry, painter) {
        super();
        this.symbol = symbol;
        this.geometry = geometry;
        this.painter = painter;
        if (geometry.type === 'Point') {
            return;
        }
        this.style = this._defineStyle(this.translate());
    }