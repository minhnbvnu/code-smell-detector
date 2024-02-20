function cvec3(sourceLists, externalFuncs = []) {
    return new ExprVec3(sourceLists, genCustomNames(sourceLists)).addFuncs(externalFuncs);
}