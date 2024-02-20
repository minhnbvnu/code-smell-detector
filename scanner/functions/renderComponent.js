function renderComponent(filepath) {
  const json = docgen.parse(
    fs.readFileSync(filepath),
    docgenHelpers.findExportedOrFirst,
    docgen.defaultHandlers.concat([
      docgenHelpers.stylePropTypeHandler,
      docgenHelpers.deprecatedPropTypeHandler,
    ])
  );

  return componentsToMarkdown('component', json, filepath, componentCount++, styleDocs);
}