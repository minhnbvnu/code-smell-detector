constructor(target) {
        super(target);
        this._thisScrollZoom = this._scrollZoom.bind(this);
        this._wheelZoomRate = wheelZoomRate;
        this._defaultZoomRate = defaultZoomRate;
        this._delta = 0;
    }