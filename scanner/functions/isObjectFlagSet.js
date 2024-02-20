function isObjectFlagSet(objectType, flag) {
        return (objectType.objectFlags & flag) !== 0;
    }