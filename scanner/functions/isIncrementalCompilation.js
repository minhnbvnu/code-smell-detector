function isIncrementalCompilation(options) {
            return !!(options.incremental || options.composite);
        }