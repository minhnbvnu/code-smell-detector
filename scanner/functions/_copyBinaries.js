function _copyBinaries(args, packagePath, resolve, reject) {
  console.log(chalk.bold('Copying app binaries...'));
  const binDestPath = path.join(packagePath, 'bin');
  mkdirp.sync(binDestPath);
  child_process.exec('cp -uR ' + path.join(args.root, 'ubuntu/bin/ubuntu-server.js ') + binDestPath + ' || true',
                      {}, (error, stdout, stderr) => {
                        if (error)
                          reject(error);
                        else
                          resolve();
                      });
}