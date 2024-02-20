function _buildSnap(args, packagePath, resolve, reject) {
  console.log(chalk.bold('Building snap package...'));
  child_process.exec('snapcraft',
                     {cwd: path.join(args.root, 'ubuntu/snap')},
                     (error, stdout, stderr) => {
                       if (error)
                        reject(error);
                      else
                        resolve();
                     });
}