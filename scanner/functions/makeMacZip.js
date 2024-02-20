function makeMacZip(appPath) {
  var child = require('child_process').spawn('zip', ['-ry', `${manifest.name}-notarized-mac.zip`, `${manifest.name}.app`], {
    cwd: appPath,
  });
  child.stdout.pipe(process.stdout);
  child.on('exit', function() {
    console.log('zip complete');
  })
}