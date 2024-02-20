function MapNode(_args) {
        T.Object.call(this, 1, _args);
        var _ = this._;
        _.input  = 0;
        _.value = 0;
        _.prev   = null;
        _.ar     = false;
        _.map    = defaultFunction;
    }