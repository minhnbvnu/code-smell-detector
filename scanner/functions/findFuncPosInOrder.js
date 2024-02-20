function findFuncPosInOrder(contractNode, funcNode) {
    if (isConstructor(funcNode, contractNode)) {
        return functionOrder.indexOf("constructor");
    }

    if (isFallback(funcNode)) {
        return functionOrder.indexOf("fallback");
    }

    // Default visibility of a function is public.
    if (funcNode.modifiers === null) {
        return functionOrder.indexOf("public");
    }

    // If we bypass all above cases, below logic is guranteed to return a valid position
    const modifNames = funcNode.modifiers.map(m => { return m.name; });

    for (let mName of modifNames) {
        const i = functionOrder.indexOf(mName);

        if (i > -1) {
            return i;
        }
    }

    // If we bypass above loop, it means modifiers exist for this func,
    // but none of them was a visibility modif. This is equivalent to public vis. modif.
    return functionOrder.indexOf("public");
}