function LagNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        var _ = this._;
        var bits = Math.ceil(Math.log(_.samplerate) * Math.LOG2E);
        _.buffersize = 1 << bits;
        _.buffermask = _.buffersize - 1;
        _.buffer = new fn.SignalArray(_.buffersize);
        _.time = 0;
        _.readIndex  = 0;
        _.writeIndex = 0;
    }