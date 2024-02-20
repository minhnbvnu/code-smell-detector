function SynthDefNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        this.playbackState = fn.FINISHED_STATE;
        _.poly     = 4;
        _.genList  = [];
        _.genDict  = {};
        _.synthdef = null;
        _.remGen = make_remGen(this);
        _.onended = fn.make_onended(this);
    }