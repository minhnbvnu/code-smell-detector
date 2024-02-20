function cliui(opts, _mixin) {
        mixin = _mixin;
        return new UI({
            width: (opts === null || opts === void 0 ? void 0 : opts.width) || getWindowWidth(),
            wrap: opts === null || opts === void 0 ? void 0 : opts.wrap
        });
    }