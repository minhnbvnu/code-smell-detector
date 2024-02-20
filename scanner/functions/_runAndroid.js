function _runAndroid(argv, config, resolve, reject) {
  const args = parseCommandLine([{
    command: 'install-debug',
    type: 'string',
    required: false,
  }, {
    command: 'root',
    type: 'string',
    description: 'Override the root directory for the android build (which contains the android directory)',
  }, {
    command: 'flavor',
    type: 'string',
    required: false,
  }], argv);

  args.root = args.root || '';

  if (!checkAndroid(args)) {
    console.log(chalk.red('Android project not found. Maybe run react-native android first?'));
    return;
  }

  resolve(isPackagerRunning().then(result => {
    if (result === 'running') {
      console.log(chalk.bold(`JS server already running.`));
    } else if (result === 'unrecognized') {
      console.warn(chalk.yellow(`JS server not recognized, continuing with build...`));
    } else {
      // result == 'not_running'
      console.log(chalk.bold(`Starting JS server...`));
      startServerInNewWindow();
    }
    buildAndRun(args, reject);
  }));
}