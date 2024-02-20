function FFT(n) {
        n = (typeof n === "number") ? n : 512;
        n = 1 << Math.ceil(Math.log(n) * Math.LOG2E);

        this.length  = n;
        this.buffer  = new T.fn.SignalArray(n);
        this.real    = new T.fn.SignalArray(n);
        this.imag    = new T.fn.SignalArray(n);
        this._real   = new T.fn.SignalArray(n);
        this._imag   = new T.fn.SignalArray(n);
        this.mag     = new T.fn.SignalArray(n>>1);

        this.minDecibels =  -30;
        this.maxDecibels = -100;

        var params = FFTParams.get(n);
        this._bitrev   = params.bitrev;
        this._sintable = params.sintable;
        this._costable = params.costable;
    }