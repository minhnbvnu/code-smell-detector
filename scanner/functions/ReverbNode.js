function ReverbNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        this._.reverb = new Reverb(this._.samplerate, this._.cellsize);
    }