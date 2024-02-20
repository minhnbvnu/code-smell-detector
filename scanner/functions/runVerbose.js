function runVerbose(root, projectName, rnPackage) {
  var proc = spawn('npm', ['install', '--verbose', '--save', getInstallPackage(rnPackage)], {stdio: 'inherit'});
  proc.on('close', function (code) {
    if (code !== 0) {
      console.error('`npm install --save react-native` failed');
      return;
    }

    cli = require(CLI_MODULE_PATH());
    cli.init(root, projectName);
  });
}