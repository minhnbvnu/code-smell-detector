function isTypeParameter(type) {
        return (type.flags & ts.TypeFlags.TypeParameter) !== 0;
    }