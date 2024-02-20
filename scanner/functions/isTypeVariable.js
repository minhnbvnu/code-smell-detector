function isTypeVariable(type) {
        return (type.flags & ts.TypeFlags.TypeVariable) !== 0;
    }