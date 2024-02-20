function cvec4(sourceLists, externalFuncs = []) {
    return new ExprVec4(sourceLists, genCustomNames(sourceLists)).addFuncs(externalFuncs);
}