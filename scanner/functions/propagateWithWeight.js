function propagateWithWeight(type, target) {
    var weight = infer.cx().parent.mod.docComment.weight;
    type.type.propagate(target, weight || (type.madeUp ? WG_MADEUP : undefined));
  }