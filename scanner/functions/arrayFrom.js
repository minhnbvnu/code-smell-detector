function arrayFrom(arrayLike, forceCopy) {
        return !forceCopy && is(arrayLike, Array) ? arrayLike : Array.prototype.slice.call(arrayLike);
    }