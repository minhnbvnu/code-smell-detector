function isPoorRelation(node) {
    return node &&
        ((node.type === "(number)" && +node.value === 0) ||
         (node.type === "(string)" && node.value === "") ||
         (node.type === "null" && !state.option.eqnull) ||
        node.type === "true" ||
        node.type === "false" ||
        node.type === "undefined");
  }