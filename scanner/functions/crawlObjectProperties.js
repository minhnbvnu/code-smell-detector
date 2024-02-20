function crawlObjectProperties(entry, sources, resolvedStyles) {
  const keys = Object.keys(entry);
  keys.forEach(key => {
    const value = entry[key];

    if (typeof value === 'string') {
      if (key === value) {
        // Special case; this key is the name of the style's source/file/module.
        sources.add(key);
      } else {
        resolvedStyles[key] = getPropertyValueForStyleName(value);
      }
    } else {
      const nestedStyle = {};
      resolvedStyles[key] = nestedStyle;
      crawlData([value], sources, nestedStyle);
    }
  });
}