function ScissorNode(_args) {
        T.Object.call(this, 2, _args);
        fn.fixAR(this);

        var _ = this._;
        _.isLooped = false;
        _.onended  = fn.make_onended(this, 0);
    }