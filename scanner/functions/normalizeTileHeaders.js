function normalizeTileHeaders(tileset) {
    const basePath = tileset.basePath;
    const root = normalizeTileData(tileset.root, tileset);
    const stack2 = [];
    stack2.push(root);
    while (stack2.length > 0) {
      const tile = stack2.pop() || {};
      const children = tile.children || [];
      for (const childHeader of children) {
        normalizeTileData(childHeader, { basePath });
        stack2.push(childHeader);
      }
    }
    return root;
  }