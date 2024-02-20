function isDirectEval(node) {
    return node.type === IDENTIFIER && node.value === "eval";
}