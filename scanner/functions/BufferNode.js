function BufferNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        var _ = this._;
        _.pitch      = T(1);
        _.samplerate = 44100;
        _.channels   = 0;
        _.bufferMix  = null;
        _.buffer     = [];
        _.isLooped   = false;
        _.isReversed = false;
        _.duration    = 0;
        _.currentTime = 0;
        _.currentTimeObj = null;
        _.phase = 0;
        _.phaseIncr = 0;
        _.onended  = fn.make_onended(this, 0);
        _.onlooped = make_onlooped(this);
    }