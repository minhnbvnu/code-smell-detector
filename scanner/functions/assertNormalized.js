function assertNormalized(configArray) {
        // TODO: Throw more verbose error
        if (!configArray.isNormalized()) {
            throw new Error('ConfigArray must be normalized to perform this operation.');
        }
    }