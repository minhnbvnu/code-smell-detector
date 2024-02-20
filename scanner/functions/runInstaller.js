async function runInstaller(installerFile, from, to) {
  const logFile = getTempFileName('installer.log');
  const options = [
    '/passive', // no user interaction, only show progress bar
    '/l*',
    logFile, // save install log to this file
    '/i',
    installerFile, // msi file to install
  ];

  const spawn = require('cross-spawn');
  const runner = spawn('msiexec', options, { stdio: 'inherit' });

  return new Promise((resolve, reject) => {
    runner.on('exit', () => {
      fs.readFile(logFile, 'utf16le', (err, data) => {
        if (err) {
          return reject(logError('runInstaller:readFile', err));
        }

        const installDir = data
          .split(os.EOL)
          .map((line) => {
            const match = line.match(/INSTALLDIR = (.+)$/);
            return match && match[1];
          })
          .filter((line) => line != null)[0];

        if (!installDir) {
          return reject(new Error('Could not find installed driver'));
        }

        fs.createReadStream(installDir + 'MicrosoftWebDriver.exe', {
          autoClose: true,
        })
          .pipe(fs.createWriteStream(to, { autoClose: true }))
          .once('finish', resolve)
          .once('error', (errWs) => reject(logError('runInstaller:createWriteStream', errWs)));
      });
    });

    runner.on('error', (errRunner) => reject(logError('runInstaller:runner', errRunner)));
  });
}