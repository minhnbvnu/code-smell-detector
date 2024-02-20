function TimeoutNode(_args) {
        T.Object.call(this, 0, _args);
        fn.timer(this);
        fn.fixKR(this);

        var _ = this._;
        this.playbackState = fn.FINISHED_STATE;
        _.currentTime = 0;
        _.samplesMax = 0;
        _.samples    = 0;
        _.onended = fn.make_onended(this);

        this.once("init", oninit);
        this.on("start", onstart);
    }