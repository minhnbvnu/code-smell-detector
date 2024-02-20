function generateParcelProject(features, name, getNodeVersionPromise) {
  const isBabel = _.includes(features, 'babel');
  const isReact = _.includes(features, 'react');
  const newBabelConfig = createBabelConfig(features);
  const additionalFilesMap = createAdditionalFilesMap(parcelConfig, features);
  const projectName = name || getDefaultProjectName('empty-project', features);
  const maybeConfigBabel =
    newBabelConfig && (isReact || isBabel)
      ? { '.babelrc': newBabelConfig }
      : null;

  const fileMap = _.assign(
    {},
    {
      'README.md': readmeFileParcel(projectName, features),
      '.gitignore': gitignore(),
    },
    maybeConfigBabel,
    additionalFilesMap
  );

  // TODO there is some duplicated code here. sorry
  if (getNodeVersionPromise) {
    return getPackageJson(
      parcelConfig,
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