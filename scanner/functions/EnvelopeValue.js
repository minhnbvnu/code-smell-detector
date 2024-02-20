function EnvelopeValue(samplerate) {
        this.samplerate = samplerate;
        this.value = ZERO;
        this.step  = 1;

        this._curveType  = CurveTypeLin;
        this._curveValue = 0;

        this._grow = 0;

        this._a2 = 0;
        this._b1 = 0;
        this._y1 = 0;
        this._y2 = 0;
    }