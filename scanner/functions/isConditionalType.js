function isConditionalType(type) {
        return (type.flags & ts.TypeFlags.Conditional) !== 0;
    }