function isPassingThrough(ctorParams, superArgs) {
        if (ctorParams.length !== superArgs.length) {
            return false;
        }
        for (let i = 0; i < ctorParams.length; ++i) {
            if (!isValidPair(ctorParams[i], superArgs[i])) {
                return false;
            }
        }
        return true;
    }