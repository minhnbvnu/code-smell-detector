function _copyAssets(args, packagePath, resolve, reject) {
  console.log(chalk.bold('Copying app assets...'));
  child_process.exec('cp -uR ' + path.join(args.root, 'ubuntu/share/* ') + path.join(packagePath, 'share') + ' || true',
                      {}, (error, stdout, stderr) => {
                        if (error)
                          reject(error);
                        else
                          resolve();
                      });
}