function normalizeMultiValues(maps) {

  if (maps) {
    return Object.entries(maps)
      .reduce((acc, [key, val]) =>
        Object.assign(acc, { [key]: Array.isArray(val) ? val : [val] }), 
      {});
  }

  return {};
}