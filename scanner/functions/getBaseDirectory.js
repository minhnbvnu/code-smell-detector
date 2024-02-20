function getBaseDirectory(pattern) {
        return globParent(pattern, { flipBackslashes: false });
    }