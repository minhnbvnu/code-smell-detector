function getHookName(hook, originalSourceAST, originalSourceCode, originalSourceLineNumber, originalSourceColumnNumber) {
  const hooksFromAST = withSyncPerfMeasurements('getPotentialHookDeclarationsFromAST(originalSourceAST)', () => getPotentialHookDeclarationsFromAST(originalSourceAST));
  let potentialReactHookASTNode = null;

  if (originalSourceColumnNumber === 0) {
    // This most likely indicates a source map type like 'cheap-module-source-map'
    // that intentionally drops column numbers for compilation speed in DEV builds.
    // In this case, we can assume there's probably only one hook per line (true in most cases)
    // and just fail if we find more than one match.
    const matchingNodes = hooksFromAST.filter(node => {
      const nodeLocationCheck = checkNodeLocation(node, originalSourceLineNumber);
      const hookDeclarationCheck = isConfirmedHookDeclaration(node);
      return nodeLocationCheck && hookDeclarationCheck;
    });

    if (matchingNodes.length === 1) {
      potentialReactHookASTNode = matchingNodes[0];
    }
  } else {
    potentialReactHookASTNode = hooksFromAST.find(node => {
      const nodeLocationCheck = checkNodeLocation(node, originalSourceLineNumber, originalSourceColumnNumber);
      const hookDeclarationCheck = isConfirmedHookDeclaration(node);
      return nodeLocationCheck && hookDeclarationCheck;
    });
  }

  if (!potentialReactHookASTNode) {
    return null;
  } // nodesAssociatedWithReactHookASTNode could directly be used to obtain the hook variable name
  // depending on the type of potentialReactHookASTNode


  try {
    const nodesAssociatedWithReactHookASTNode = withSyncPerfMeasurements('getFilteredHookASTNodes()', () => getFilteredHookASTNodes(potentialReactHookASTNode, hooksFromAST, originalSourceCode));
    const name = withSyncPerfMeasurements('getHookNameFromNode()', () => getHookNameFromNode(hook, nodesAssociatedWithReactHookASTNode, potentialReactHookASTNode));
    return name;
  } catch (error) {
    console.error(error);
    return null;
  }
}