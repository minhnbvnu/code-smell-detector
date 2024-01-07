constructor(geoType, type, data, options) {
        super(null, options);
        this.GeometryType = geoType;
        this.type = type;
        this._initData(data);
    }