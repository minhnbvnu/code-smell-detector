function cfloat(sourceLists, externalFuncs = []) {
    return new ExprFloat(sourceLists, genCustomNames(sourceLists)).addFuncs(externalFuncs);
}