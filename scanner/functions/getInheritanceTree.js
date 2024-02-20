function getInheritanceTree(cls) {
  let base = cls;
  let tree = [cls.name];
  while (true) {
    base = Object.getPrototypeOf(base);
    if (base === Function.prototype) break;
    tree.push(base.name);
  };
  return tree;
}