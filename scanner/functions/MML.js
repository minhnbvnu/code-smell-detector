function MML(_args) {
        T.Object.call(this, 0, _args);
        fn.timer(this);
        fn.fixKR(this);

        var _ = this._;
        _.tracks  = [];
        _.onended = fn.make_onended(this);
        _.currentTime = 0;

        this.on("start", onstart);
    }