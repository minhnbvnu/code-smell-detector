function makeSetExports(moduleObj) {
        return function (exports) {
            moduleObj.exports = exports;
        };
    }