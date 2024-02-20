function resolveReplications(ast) {
  ast.source_ = flatten(ast.source_.map(child => {
    const {
      replicate,
      ...options
    } = child.options_ || {};

    if (!replicate) {
      return [child];
    }

    delete child.options_.replicate;
    return Array(replicate).fill(child);
  }));
}