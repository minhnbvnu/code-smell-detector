function forSomeAncestorDirectory(directory, callback) {
            return !!forEachAncestorDirectory(directory, (d) => callback(d) ? true : void 0);
        }