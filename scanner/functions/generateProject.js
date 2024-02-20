function generateProject(
  requestedFeatures,
  { basePath, name },
  projectGenerator
) {
  const isReact = _.includes(requestedFeatures, 'react');
  const isVue = _.includes(requestedFeatures, 'vue');
  const isTypescript = _.includes(requestedFeatures, 'typescript');
  const isBabel = _.includes(requestedFeatures, 'babel');
  const isHotReact = _.includes(requestedFeatures, 'react-hot-loader');
  const indexSuffix = isTypescript ? 'ts' : 'js';

  if (isHotReact && !isReact) {
    console.log('Cannot configure React hot loading without configuring React');
    return;
  }

  if (isHotReact && isTypescript) {
    console.log('Typescript with React hot loading currently not supported');
    return;
  }

  if (isReact && isVue) {
    console.log(
      'React and Vue in same project not currently supported. Pick one'
    );
    return;
  }

  if (isReact && !isTypescript && !isBabel) {
    console.log('Select either Babel or Typescript when using React');
    return;
  }

  const projectName =
    name || getDefaultProjectName('empty-project', requestedFeatures);
  const fullPath = (basePath || '.') + '/' + projectName + '/';

  const newWebpackConfig = createWebpackConfig(requestedFeatures);
  const newBabelConfig = createBabelConfig(requestedFeatures);

  console.log('Generating ' + projectName + '...');

  mkDir(basePath);
  mkDir(fullPath);
  return projectGenerator(requestedFeatures, name, getNodeVersionPromise).then(
    files => {
      _.forEach(files, (content, filename) => {
        // only support one level directories right now.
        if (_.includes(filename, '/')) {
          const dirs = _.split(filename, '/');
          mkDir(fullPath + dirs[0]);
        }

        writeFile(fullPath + filename, content);
      });
      console.log('Done generating ' + projectName + '!');
      return projectName;
    }
  );
}