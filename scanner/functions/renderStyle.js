function renderStyle(filepath) {
  const json = docgen.parse(
    fs.readFileSync(filepath),
    docgenHelpers.findExportedObject,
    [docgen.handlers.propTypeHandler]
  );

  // Remove deprecated transform props from docs
  if (filepath === '../Libraries/StyleSheet/TransformPropTypes.js') {
    ['rotation', 'scaleX', 'scaleY', 'translateX', 'translateY'].forEach(function(key) {
      delete json.props[key];
    });
  }

  return componentsToMarkdown('style', json, filepath, componentCount++);
}