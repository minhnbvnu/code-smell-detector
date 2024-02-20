function _buildClick(args, packagePath, resolve, reject) {
  console.log(chalk.bold('Building click package...'));
  child_process.exec('click build click .',
                     {cwd: path.join(args.root, 'ubuntu')},
                     (error, stdout, stderr) => {
                       if (error)
                        reject(error);
                      else
                        resolve();
                     });
}