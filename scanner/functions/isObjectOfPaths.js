function isObjectOfPaths(obj) {
        return Object.prototype.hasOwnProperty.call(obj, 'paths');
    }