function validateFixTypes(fixTypes) {
        for (const fixType of fixTypes) {
            if (!validFixTypes.has(fixType)) {
                throw new Error(`Invalid fix type "${fixType}" found.`);
            }
        }
    }