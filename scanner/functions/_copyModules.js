function _copyModules(args, packagePath, resolve, reject) {
  console.log(chalk.bold('Copying Ubuntu modules...'));
  const pluginsDestPath = path.join(packagePath, 'plugins');
  mkdirp.sync(pluginsDestPath);
  child_process.exec('cp -uR ' + path.join(args.root, 'ubuntu/plugins/* ') + pluginsDestPath + ' || true',
                      {}, (error, stdout, stderr) => {
                        if (error)
                          reject(error);
                        else
                          resolve();
                      });
}