constructor(geometry, isMask) {
        super();
        this.geometry = geometry;
        this.isMask = isMask;
        this.bbox = getDefaultBBOX();
        this._drawTime = 0;
    }