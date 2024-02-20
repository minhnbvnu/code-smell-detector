function Envelope(samplerate) {
        this.samplerate = samplerate || 44100;
        this.value  = ZERO;
        this.status = StatusWait;
        this.curve  = "linear";
        this.step   = 1;
        this.releaseNode = null;
        this.loopNode    = null;
        this.emit = null;

        this._envValue = new EnvelopeValue(samplerate);

        this._table  = [];
        this._initValue  = ZERO;
        this._curveValue = 0;
        this._defaultCurveType = CurveTypeLin;
        this._index   = 0;
        this._counter = 0;
    }