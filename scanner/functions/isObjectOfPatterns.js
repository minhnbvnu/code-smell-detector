function isObjectOfPatterns(obj) {
        return Object.prototype.hasOwnProperty.call(obj, 'patterns');
    }