function findExportedOrFirst(node, recast) {
  return docgen.resolver.findExportedComponentDefinition(node, recast) ||
    docgen.resolver.findAllComponentDefinitions(node, recast)[0];
}