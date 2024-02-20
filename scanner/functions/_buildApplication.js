function _buildApplication(args) {
  return new Promise((resolve, reject) => {
    console.log(chalk.bold('Building the app...'));

    var buildCommand = './build.sh';
    if (args['arch'].startsWith('arm')) {
      buildCommand = 'click chroot -a armhf -f ubuntu-sdk-15.04 -n click run ' + buildCommand;
    }
    child_process.exec(buildCommand, {cwd: path.join(args.root, 'ubuntu')},
                        (error, stdout, stderr) => {
                          if (error)
                            reject(error);
                          else
                            resolve();
                        });
  });
}