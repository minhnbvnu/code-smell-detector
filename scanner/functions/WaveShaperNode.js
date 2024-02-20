function WaveShaperNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        this._.curve = null;
    }