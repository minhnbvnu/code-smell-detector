function makeStructureNS(namespaceURIs, structure, structureNS) {
  structureNS = structureNS !== undefined ? structureNS : {};
  let i, ii;
  for (i = 0, ii = namespaceURIs.length; i < ii; ++i) {
    structureNS[namespaceURIs[i]] = structure;
  }
  return structureNS;
}