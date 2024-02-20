function sortAutoValueFunctions(autoValueFunctions) {
  const defaultFieldOrder = autoValueFunctions.reduce((acc, { fieldName }, index) => {
    acc[fieldName] = index;
    return acc;
  }, {});

  // Sort by how many dots each field name has, asc, such that we can auto-create
  // objects and arrays before we run the autoValues for properties within them.
  // Fields of the same level (same number of dots) preserve should order from the original array.
  return autoValueFunctions.sort((a, b) => {
    const depthDiff = a.fieldName.split('.').length - b.fieldName.split('.').length;
    return depthDiff === 0 ? defaultFieldOrder[a.fieldName] - defaultFieldOrder[b.fieldName] : depthDiff;
  });
}