function resetZoneWrap (old) {
        return function () {
            this._z = null;
            return old.apply(this, arguments);
        };
    }