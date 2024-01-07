constructor(id, geometries, options) {
        if (geometries && (!(geometries instanceof Geometry) && !Array.isArray(geometries) && GEOJSON_TYPES.indexOf(geometries.type) < 0)) {
            options = geometries;
            geometries = null;
        }
        super(id, options);
        this._maxZIndex = 0;
        this._minZIndex = 0;
        this._initCache();
        if (geometries) {
            this.addGeometry(geometries);
        }
        const style = this.options['style'];
        if (style) {
            this.setStyle(style);
        }
    }