function MediaStreamNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.src = _.func = null;
        _.bufferL = new fn.SignalArray(BUFFER_SIZE);
        _.bufferR = new fn.SignalArray(BUFFER_SIZE);
        _.readIndex  = 0;
        _.writeIndex = 0;
        _.totalRead  = 0;
        _.totalWrite = 0;
    }