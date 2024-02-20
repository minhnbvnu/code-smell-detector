function ZMapNode(_args) {
        T.Object.call(this, 1, _args);

        var _ = this._;
        _.inMin  = 0;
        _.inMax  = 1;
        _.outMin = 0;
        _.outMax = 1;
        _.ar     = false;

        this.once("init", oninit);
    }