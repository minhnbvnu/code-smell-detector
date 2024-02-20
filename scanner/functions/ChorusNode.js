function ChorusNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var chorus = new Chorus(this._.samplerate);
        chorus.setDelayTime(20);
        chorus.setRate(4);
        chorus.depth = 20;
        chorus.feedback = 0.2;
        chorus.mix = 0.33;
        this._.chorus = chorus;
    }