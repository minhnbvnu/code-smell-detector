function ParamNode(_args) {
        T.Object.call(this, 2, _args);

        var _ = this._;
        _.value = 0;
        _.env = new EnvelopeValue(_.samplerate);
        _.env.step = _.cellsize;
        _.curve   = "lin";
        _.counter = 0;
        _.ar = false;
        _.onended = make_onended(this);

        this.on("ar", onar);
    }