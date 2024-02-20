function createRestriction(def) {
    if (typeof def === "string") {
        return new Restriction({ name: def })
    }
    return new Restriction(def)
}