function isFunctionVisibility(contractNode, funcNode, typeDescriptor) {
    const funcPosInOrder = findFuncPosInOrder(contractNode, funcNode);
    return typeDescriptor === functionOrder[funcPosInOrder];
}