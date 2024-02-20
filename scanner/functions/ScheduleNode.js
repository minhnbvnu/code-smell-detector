function ScheduleNode(_args) {
        T.Object.call(this, 0, _args);
        fn.timer(this);
        fn.fixKR(this);

        var _ = this._;
        _.queue = [];
        _.currentTime = 0;
        _.maxRemain   = 1000;
    }