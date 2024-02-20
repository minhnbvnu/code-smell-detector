function genCustomNames(sourceLists) {
    const names = [];
    for (let i = 0; i < sourceLists.values.length; i++) {
        names.push("uCustomName" + i);
    }
    return names;
}