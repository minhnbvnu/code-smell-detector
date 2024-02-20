function withAppId() {
  // grab largest
  var key = Object.keys(manifest.icons).sort((a,b) => parseInt(a) < parseInt(b))[0].toString();
  var icon = path.join(appDir, manifest.icons[key]);
  var iconScript = null;
  if (os.platform() == 'win32')
    iconScript = 'icon.bat';
  else
    iconScript = './icon.sh';

  if (iconScript) {
    console.log(iconScript);
    var child = require('child_process').exec(`${iconScript} ${icon}`);
    child.stdout.pipe(process.stdout)
    child.on('exit', function() {
      console.log('icon creation done')
      startPackager();
    })
    child.on('error', function() {
      console.error(arguments);
    })
  }
  else {
    startPackager();
  }
}