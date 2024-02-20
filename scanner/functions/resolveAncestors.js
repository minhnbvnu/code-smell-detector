function resolveAncestors(ast, ancestors) {
  let parent = ast;

  for (let i = 0; i < ancestors.length - 1; i++) {
    const {
      key,
      index
    } = ancestors[i];

    if (index === undefined) {
      parent = parent[key];
    } else {
      parent = parent[key][index];
    }
  }

  const {
    key,
    index
  } = ancestors[ancestors.length - 1];
  return {
    parent,
    key,
    index
  };
}