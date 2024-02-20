function RecNode(_args) {
        T.Object.call(this, 1, _args);
        fn.listener(this);
        fn.fixAR(this);

        var _ = this._;
        _.timeout    = 5000;
        _.status     = STATUS_WAIT;
        _.writeIndex = 0;
        _.writeIndexIncr  = 1;
        _.currentTime     = 0;
        _.currentTimeIncr = 1000 / _.samplerate;
        _.onended = make_onended(this);
    }