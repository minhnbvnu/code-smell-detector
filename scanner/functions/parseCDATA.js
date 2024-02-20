function parseCDATA(context, ancestors) {
    advanceBy(context, 9);
    const nodes = parseChildren(context, 3, ancestors);
    if (context.source.length === 0) {
      emitError(context, 6);
    } else {
      advanceBy(context, 3);
    }
    return nodes;
  }