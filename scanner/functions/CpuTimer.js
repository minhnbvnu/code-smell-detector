constructor(app) {
        this._frameIndex = 0;
        this._frameTimings = [];
        this._timings = [];
        this._prevTimings = [];
        this.unitsName = 'ms';
        this.decimalPlaces = 1;

        this.enabled = true;

        app.on('frameupdate', this.begin.bind(this, 'update'));
        app.on('framerender', this.mark.bind(this, 'render'));
        app.on('frameend', this.mark.bind(this, 'other'));
    }