function cvec2(sourceLists, externalFuncs = []) {
    return new ExprVec2(sourceLists, genCustomNames(sourceLists)).addFuncs(externalFuncs);
}