function applyDefault(defaultOptions, userOptions) {
        // clone defaults
        const options = JSON.parse(JSON.stringify(defaultOptions));
        if (userOptions == null) {
            return options;
        }
        // For avoiding the type error
        //   `This expression is not callable. Type 'unknown' has no call signatures.ts(2349)`
        options.forEach((opt, i) => {
            if (userOptions[i] !== undefined) {
                const userOpt = userOptions[i];
                if ((0, deepMerge_1.isObjectNotArray)(userOpt) && (0, deepMerge_1.isObjectNotArray)(opt)) {
                    options[i] = (0, deepMerge_1.deepMerge)(opt, userOpt);
                }
                else {
                    options[i] = userOpt;
                }
            }
        });
        return options;
    }