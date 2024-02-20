function restoreAfterEach (obj, prop) {
    const originalValue = obj[prop];
    const restoreProp = Object.prototype.hasOwnProperty.call(obj, prop)
        ? () => { obj[prop] = originalValue; }
        : () => { delete obj[prop]; };

    afterEach(restoreProp);
}