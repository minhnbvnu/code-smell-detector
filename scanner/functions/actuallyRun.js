function actuallyRun(args, reject) {
  process.chdir(path.join(args.root, 'ubuntu'));

  console.log(chalk.bold('Starting the app...'));
  try {
      var appArgs = [];
      if (args['live-reload'])
        appArgs.push('--live-reload');
      if (args['host'])
        appArgs.push('--host=' + args['host']);
      if (args['port'])
        appArgs.push('--port=' + args['port']);
      if (args['executor'])
        appArgs.push('--executor=' + args['executor']);
      if (args['arch'].startsWith('arm'))
        appArgs.push('--on-device');
      appArgs.push('--plugins-path=' + args['plugins-path']);
      child_process.spawnSync('./run-app.sh', appArgs,
                              {stdio: 'inherit'});
  } catch (e) {
    console.log(chalk.red('Could not start the app, see the error above.'));
    console.log(e.stdout)
    console.log(e.stderr)
    reject();
  }
}