function generateSnowpackProject(features, name, getNodeVersionPromise) {
  const newSnowpackConfig = createSnowpackConfig(
    features,
    snowpackConfig.features
  );
  const additionalFilesMap = createAdditionalFilesMap(snowpackConfig, features);
  const projectName = name || getDefaultProjectName('empty-project', features);

  const fileMap = _.assign(
    {},
    {
      'snowpack.config.json': newSnowpackConfig,
      'README.md': readmeFileSnowpack(projectName, features),
      '.gitignore': gitignore(),
    },
    additionalFilesMap
  );

  // TODO there is some duplicated code here. sorry
  if (getNodeVersionPromise) {
    return getPackageJson(
      snowpackConfig,
      projectName,
      getNodeVersionPromise,
      features
    ).then(packageJson => {
      fileMap['package.json'] = JSON.stringify(packageJson, null, 2);
      return fileMap;
    });
  }
  return fileMap;
}