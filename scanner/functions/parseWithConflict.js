function parseWithConflict(str, fileLoc) {
  const variants = extractConflictVariants(str);
  try {
    return { type: 'merge', object: Object.assign({}, parse(variants[0], fileLoc), parse(variants[1], fileLoc)) };
  } catch (err) {
    if (err instanceof SyntaxError) {
      return { type: 'conflict', object: {} };
    } else {
      throw err;
    }
  }
}