function isEnumType(type) {
        return (type.flags & ts.TypeFlags.Enum) !== 0;
    }