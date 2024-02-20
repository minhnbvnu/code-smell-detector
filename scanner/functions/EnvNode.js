function EnvNode(_args) {
        T.Object.call(this, 2, _args);
        var _ = this._;
        _.env = new Envelope(_.samplerate);
        _.env.setStep(_.cellsize);
        _.tmp = new fn.SignalArray(_.cellsize);
        _.ar = false;
        _.plotFlush = true;
        _.onended = make_onended(this);
        this.on("ar", onar);
    }