function dumpSymbol(binaryPath) {
  const minidump = require('minidump');

  return new Promise(function(resolve, reject) {
    minidump.dumpSymbol(binaryPath, function(error, content) {
      if (error) {
        // fswin.node is only used on windows, ignore the error on other platforms
        if (process.platform !== 'win32' && binaryPath.match(/fswin.node/))
          return resolve();
        throw new Error(error);
      } else {
        const moduleLine = /MODULE [^ ]+ [^ ]+ ([0-9A-F]+) (.*)\n/.exec(
          content
        );
        if (moduleLine.length !== 3) {
          const errorMessage = `Invalid output when dumping symbol for ${binaryPath}`;
          console.error(errorMessage);
          throw new Error(errorMessage);
        } else {
          const filename = moduleLine[2];
          const symbolDirPath = path.join(
            CONFIG.symbolsPath,
            filename,
            moduleLine[1]
          );
          const symbolFilePath = path.join(symbolDirPath, `${filename}.sym`);
          fs.mkdirpSync(symbolDirPath);
          fs.writeFileSync(symbolFilePath, content);
          resolve();
        }
      }
    });
  });
}