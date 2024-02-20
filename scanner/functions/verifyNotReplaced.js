function verifyNotReplaced(object, property) {
        forEach(fakeRestorers, function(fakeRestorer) {
            if (fakeRestorer.object === object && fakeRestorer.property === property) {
                throw new TypeError("Attempted to replace " + property + " which is already replaced");
            }
        });
    }