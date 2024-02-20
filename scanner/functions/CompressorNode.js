function CompressorNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.prevThresh = -24;
        _.prevKnee   =  30;
        _.prevRatio  =  12;
        _.thresh = T(_.prevThresh);
        _.knee   = T(_.prevKnee);
        _.ratio  = T(_.prevRatio);
        _.postGain  = 6;
        _.reduction = 0;
        _.attack = 3;
        _.release = 25;

        _.comp = new Compressor(_.samplerate);
        _.comp.dbPostGain = _.postGain;
        _.comp.setAttackTime(_.attack * 0.001);
        _.comp.setReleaseTime(_.release * 0.001);
        _.comp.setPreDelayTime(6);
        _.comp.setParams(_.prevThresh, _.prevKnee, _.prevRatio);
    }