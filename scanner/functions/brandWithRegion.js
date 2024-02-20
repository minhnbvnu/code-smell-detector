function brandWithRegion(expr, funcIndex, space) {
    // if it's not a rectangle region we can't do anything so just return
    if (!Array.isArray(space))
        return;
    const sourceLists = expr.sourceLists;
    const funcs = expr.externalFuncs;
    const needs = expr.needs;
    if (expr.regionBranded ||
        (!needs.neighborSample && needs.extraBuffers.size === 0))
        return;
    const { origFuncName, newFuncName, ending } = nameExtractor(sourceLists, "_region");
    const openFuncName = newFuncName.substr(0, newFuncName.length - ~~(ending === ")"));
    const newFuncDeclaration = openFuncName +
        "float r_x_min, float r_y_min, float r_x_max, float r_y_max" +
        (ending === ")" ? ")" : ", ");
    const origTextureName = "texture2D(";
    const newTextureName = "texture2D_region(r_x_min, r_y_min, r_x_max, r_y_max, ";
    // replace name in the external function and `texture2D` and sampler
    // (assumes the sampling function is the first external function)
    funcs[funcIndex] = funcs[funcIndex]
        .split(origFuncName)
        .join(newFuncDeclaration)
        .split(origTextureName)
        .join(newTextureName);
    // shift the original name off the list
    sourceLists.sections.shift();
    // add the close paren if we're opening up a function with 0 args
    if (ending === ")")
        sourceLists.sections.unshift(")");
    // add commas (one less if it is a 0 arg function call)
    for (let i = 0; i < 4 - ~~(ending === ")"); i++) {
        sourceLists.sections.unshift(", ");
    }
    // add the new name to the beginning of the list
    sourceLists.sections.unshift(newFuncName.substr(0, newFuncName.length - ~~(ending === ")")));
    // add values from region data
    sourceLists.values.unshift(...space);
    // put the texture access wrapper at the beginning
    funcs.unshift(glslfunctions_1.glslFuncs.texture2D_region);
    expr.regionBranded = true;
}