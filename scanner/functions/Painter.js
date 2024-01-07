constructor(geometry) {
        super();
        this.geometry = geometry;
        this.symbolizers = this._createSymbolizers();
        this._altAtGL = this._getGeometryAltitude();
        this.bbox = getDefaultBBOX();
        this._drawTime = 0;
    }