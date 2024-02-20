function PinkNoiseNode(_args) {
        T.Object.call(this, 1, _args);
        fn.fixAR(this);

        var whites = new Uint8Array(5);
        for (var i = 0; i < 5; ++i) {
            whites[i] = ((Math.random() * (1<<30))|0) % 25;
        }
        this._.whites = whites;
        this._.key = 0;
    }