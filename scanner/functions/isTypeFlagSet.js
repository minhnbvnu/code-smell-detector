function isTypeFlagSet(type, flagsToCheck, isReceiver) {
        const flags = getTypeFlags(type);
        if (isReceiver && flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown)) {
            return true;
        }
        return (flags & flagsToCheck) !== 0;
    }