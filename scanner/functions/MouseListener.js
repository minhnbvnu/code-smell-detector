function MouseListener(_args) {
        if (instance) {
            return instance;
        }
        instance = this;

        T.Object.call(this, 1, _args);

        this.X = new T.ChannelObject(this);
        this.Y = new T.ChannelObject(this);
        this.cells[3] = this.X.cell;
        this.cells[4] = this.Y.cell;

        fn.fixKR(this);
    }