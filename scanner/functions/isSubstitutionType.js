function isSubstitutionType(type) {
        return (type.flags & ts.TypeFlags.Substitution) !== 0;
    }