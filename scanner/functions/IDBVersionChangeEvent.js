function IDBVersionChangeEvent (type /* , eventInitDict */) { // eventInitDict is a IDBVersionChangeEventInit (but is not defined as a global)
    // @ts-expect-error It's passing only one!
    ShimEvent.call(this, type);
    this[Symbol.toStringTag] = 'IDBVersionChangeEvent';
    this.toString = function () {
        return '[object IDBVersionChangeEvent]';
    };
    // eslint-disable-next-line prefer-rest-params
    this.__eventInitDict = arguments[1] || {};
}