function GateNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        this._.selected = 0;
        this._.outputs  = [];
    }