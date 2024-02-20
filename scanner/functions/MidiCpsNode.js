function MidiCpsNode(_args) {
        T.Object.call(this, 1, _args);
        var _ = this._;
        _.midi = 0;
        _.value = 0;
        _.prev  = null;
        _.a4    = 440;
        _.ar    = false;
    }