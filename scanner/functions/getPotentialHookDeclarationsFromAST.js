function getPotentialHookDeclarationsFromAST(sourceAST) {
  const potentialHooksFound = [];
  withSyncPerfMeasurements('traverse(sourceAST)', () => traverse_lib_default()(sourceAST, {
    enter(path) {
      if (path.isVariableDeclarator() && isPotentialHookDeclaration(path)) {
        potentialHooksFound.push(path);
      }
    }

  }));
  return potentialHooksFound;
}