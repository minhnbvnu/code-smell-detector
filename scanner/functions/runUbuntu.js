function runUbuntu(argv, config) {
  const args = parseArguments(argv);

  return new Promise((resolve, reject) => {
    if (!checkUbuntu(args)) {
      console.log(chalk.red('Ubuntu project not found. Maybe run react-native ubuntu first?'));
    } else {
      resolve();
    }
  }).then(() => {
    return buildUbuntu(args);
  }).then(() => {
    return _runUbuntu(args, config);
  });
}