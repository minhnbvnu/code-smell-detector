function duplicateComponents(comps) {
    return new Set(comps.split("")).size !== comps.length;
}