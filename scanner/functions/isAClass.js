function isAClass (thing) {
        return (typeof thing === 'function' ||
            (typeof thing === 'object' && (thing.__proto__ || thing.prototype))); // eslint-disable-line no-proto
    }