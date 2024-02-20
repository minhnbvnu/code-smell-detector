function _fetchArmNode(args, packagePath, resolve, reject) {
  console.log(chalk.bold('Downloading arm node binaries...'));
  const binDestPath = path.join(packagePath, 'bin');
  const tmpPath = path.join(args.root, 'ubuntu/tmp');

  const wget = 'wget -N https://nodejs.org/dist/v4.4.7/node-v4.4.7-linux-armv7l.tar.xz';
  const tar = 'tar xf node-v4.4.7-linux-armv7l.tar.xz node-v4.4.7-linux-armv7l/bin/node';
  const mv = 'mv node-v4.4.7-linux-armv7l/bin/node ../../' + binDestPath;
  const download_cmd = wget + ' && ' + tar + ' && ' + mv;

  mkdirp.sync(binDestPath);
  child_process.exec(download_cmd,
                     {cwd: tmpPath},
                     (error, stdout, stderr) => {
                       if (error)
                        reject(error);
                      else
                        resolve();
                     });
}