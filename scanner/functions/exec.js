function exec(command) {
  return new Promise(function(resolve, reject) {
    childProcess.exec(command, function(error, stdout, stderr) {
      if (error) {
        return reject(error);
      }

      resolve({ stdout, stderr });
    });
  });
}