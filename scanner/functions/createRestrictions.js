function createRestrictions(defs) {
    return (defs || []).map(createRestriction)
}