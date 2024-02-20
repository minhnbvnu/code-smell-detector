function packageUbuntu(argv, config) {
  const args = parseArguments(argv);
  var packagePath = '';

  return new Promise((resolve, reject) => {
    if (!checkUbuntu(args)) {
      console.log(chalk.red('Ubuntu project not found. Maybe run react-native ubuntu first?'));
    } else {
      resolve();
    }
  }).then(() => {
    return new Promise((resolve, reject) => {
      if (!args.click && !args.snap || args.click && args.snap) {
        console.log(chalk.red('You must be creating either a click or snap package.'));
        return;
      }
      packagePath = path.join(args.root, `ubuntu/${args.click ? 'click' : 'snap'}/`);
      resolve();
    });
  }).then(() => {
    return buildUbuntu(args);
  }).then(() => {
    console.log(chalk.bold('Running RN bundler...'));
    const sharePath = path.join(packagePath, 'share');
    mkdirp.sync(path.join(sharePath, 'js'));
    const bundleArgs=`--platform ubuntu --entry-file index.ubuntu.js --bundle-output ${path.join(sharePath, 'js/index.js')} --assets-dest ${path.join(sharePath, 'assets')}`.split(' ');
    return bundle(bundleArgs, config);
  }).then(() => {
    return new Promise((resolve, reject) => {
      if (args.click)
        _fetchArmNode(args, packagePath, resolve, reject);
      else
        resolve();
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      _copyAssets(args, packagePath, resolve, reject);
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      _copyModules(args, packagePath, resolve, reject);
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      _copyBinaries(args, packagePath, resolve, reject);
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      if (args.click)
        _buildClick(args, packagePath, resolve, reject);
      else {
        _buildSnap(args, packagePath, resolve, reject);
      }
    });
  });
}