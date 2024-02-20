function WebAudioAPINode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.mode = "";
        _.bufferL = new fn.SignalArray(BUFFERSIZE << 2);
        _.bufferR = new fn.SignalArray(BUFFERSIZE << 2);
        _.buffermask = _.bufferL.length - 1;
        _.node   = null;
        _.script = context.createScriptProcessor(BUFFERSIZE, 2, 2);
        _.writeIndex = 0;
        _.readIndex  = 0;
        _.totalRead  = 0;
        _.totalWrite = 0;
    }