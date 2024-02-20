function createWebpackConfig(configItems) {
  const imports = _.concat(baseWebpackImports, getWebpackImports(configItems));
  const importsLines = imports.join('\n');
  const config = createConfig(configItems, 'webpack', features);
  const exportStatement = createWebpackConfigExportStatement(configItems);

  return `${importsLines}

const config = ${config};

module.exports = ${exportStatement};`;
}