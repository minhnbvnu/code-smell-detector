function MouseXY(_args) {
        T.Object.call(this, 1, _args);
        if (!instance) {
            instance = new MouseListener([]);
        }
        fn.fixKR(this);
    }