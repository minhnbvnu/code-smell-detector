constructor(geometry, opts) {
        super(opts);
        this._geometry = geometry;
        if (!this._geometry) {
            return;
        }
    }