function getAPIDocsForDependencies() {
  const classes = {};
  for (let apiJSONPath of glob.sync(
    `${CONFIG.repositoryRootPath}/node_modules/*/api.json`
  )) {
    Object.assign(classes, require(apiJSONPath).classes);
  }
  return classes;
}