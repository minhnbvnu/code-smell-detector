function KeyboardListener(_args) {
        if (instance) {
            return instance;
        }
        instance = this;

        T.Object.call(this, 1, _args);

        fn.fixKR(this);
    }