function isRunnable(componentName, componentPlatform) {
  let exPath = '../Examples/UIExplorer/' + componentName + 'Example.js';
  if (!fs.existsSync(exPath)) {
    exPath = '../Examples/UIExplorer/' + componentName + 'Example.' + componentPlatform + '.js';
    if (!fs.existsSync(exPath)) {
      return false;
    }
  }
  return true;
}