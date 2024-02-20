function hasSuperClass(thisEnvFn) {
  return thisEnvFn.isClassMethod() && !!thisEnvFn.parentPath.parentPath.node.superClass;
}