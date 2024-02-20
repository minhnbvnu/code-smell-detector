function _buildModules(args, dependencies, resolve, reject) {
  var builds = dependencies.map((p) => {
    return new Promise((resolve, reject) => {
      console.log(chalk.bold('Building Ubuntu module: ') + p.name);

      var buildCommand = 'URN_OUTPUT_DIR=' + path.resolve(args.root, 'ubuntu', 'plugins');
      if (args['arch'].startsWith('arm')) {
        buildCommand = 'click chroot -a armhf -f ubuntu-sdk-15.04 -n click run ' + buildCommand + ' ' + p.build;
      } else {
        buildCommand += ' ' + p.build;
      }

      child_process.exec(buildCommand, {cwd: p.path}, (error, stdout, stderr) => {
                             if (error) {
                               reject(error);
                             } else {
                               resolve(true);
                             }
                            });
    });
  });

  Promise.all(builds).then((result) => {
    resolve();
  }).catch((err) => {
    reject("Package build failed: " + err);
  });
}