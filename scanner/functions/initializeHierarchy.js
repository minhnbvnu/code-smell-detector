function initializeHierarchy(batchTable, jsonHeader, binaryBody) {
    if (!jsonHeader) {
      return null;
    }
    let hierarchy = batchTable.getExtension("3DTILES_batch_table_hierarchy");
    const legacyHierarchy = jsonHeader.HIERARCHY;
    if (legacyHierarchy) {
      console.warn("3D Tile Parser: HIERARCHY is deprecated. Use 3DTILES_batch_table_hierarchy.");
      jsonHeader.extensions = jsonHeader.extensions || {};
      jsonHeader.extensions["3DTILES_batch_table_hierarchy"] = legacyHierarchy;
      hierarchy = legacyHierarchy;
    }
    if (!hierarchy) {
      return null;
    }
    return initializeHierarchyValues(hierarchy, binaryBody);
  }