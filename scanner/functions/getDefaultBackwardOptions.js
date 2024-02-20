function getDefaultBackwardOptions(options) {
        return Object.assign({}, {
            minBoxSize: CELL_SIZE
        }, options);
    }