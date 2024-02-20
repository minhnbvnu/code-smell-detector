function getAllNormalizedOptions(rawOptions = {}) {
        return {
            Line: getNormalizedOptions(rawOptions, "line"),
            Block: getNormalizedOptions(rawOptions, "block")
        };
    }