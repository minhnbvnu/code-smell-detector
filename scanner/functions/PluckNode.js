function PluckNode(_args) {
        T.Object.call(this, 1, _args);

        this._.freq   = 440;
        this._.buffer = null;
        this._.index  = 0;
    }