function resetZoneWrap2 (old) {
        return function () {
            if (arguments.length > 0) this._z = null;
            return old.apply(this, arguments);
        };
    }