function getBindingIdentifierPaths(duplicates = false, outerOnly = false) {
  const path = this;
  let search = [].concat(path);
  const ids = Object.create(null);

  while (search.length) {
    const id = search.shift();
    if (!id) continue;
    if (!id.node) continue;
    const keys = t.getBindingIdentifiers.keys[id.node.type];

    if (id.isIdentifier()) {
      if (duplicates) {
        const _ids = ids[id.node.name] = ids[id.node.name] || [];

        _ids.push(id);
      } else {
        ids[id.node.name] = id;
      }

      continue;
    }

    if (id.isExportDeclaration()) {
      const declaration = id.get("declaration");

      if (declaration.isDeclaration()) {
        search.push(declaration);
      }

      continue;
    }

    if (outerOnly) {
      if (id.isFunctionDeclaration()) {
        search.push(id.get("id"));
        continue;
      }

      if (id.isFunctionExpression()) {
        continue;
      }
    }

    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const child = id.get(key);

        if (Array.isArray(child) || child.node) {
          search = search.concat(child);
        }
      }
    }
  }

  return ids;
}