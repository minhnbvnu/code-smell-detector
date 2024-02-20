function createProject(name, verbose, rnPackage) {
  var root = path.resolve(name);
  var projectName = path.basename(root);

  console.log(
    'This will walk you through creating a new React Native project in',
    root
  );

  if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  var packageJson = {
    name: projectName,
    version: '0.0.1',
    private: true,
    scripts: {
      start: 'node node_modules/react-native/local-cli/cli.js start'
    }
  };
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson));
  process.chdir(root);

  console.log('Installing react-native package from npm...');

  if (verbose) {
    runVerbose(root, projectName, rnPackage);
  } else {
    run(root, projectName, rnPackage);
  }
}