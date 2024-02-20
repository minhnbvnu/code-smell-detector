function hasMultipleChildren(node) {
    const children = node.children = node.children.filter(
      (c) => c.type !== 3 && !(c.type === 2 && !c.content.trim())
    );
    const child = children[0];
    return children.length !== 1 || child.type === 11 || child.type === 9 && child.branches.some(hasMultipleChildren);
  }