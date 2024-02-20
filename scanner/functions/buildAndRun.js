function buildAndRun(args, reject) {
  process.chdir(path.join(args.root, 'android'));
  try {
    const cmd = process.platform.startsWith('win')
      ? 'gradlew.bat'
      : './gradlew';

    const gradleArgs = [];
    if (args['flavor']) {
        gradleArgs.push('install' +
          args['flavor'][0].toUpperCase() + args['flavor'].slice(1)
        );
    } else {
        gradleArgs.push('installDebug');
    }

    if (args['install-debug']) {
      gradleArgs.push(args['install-debug']);
    }

    console.log(chalk.bold(
      `Building and installing the app on the device (cd android && ${cmd} ${gradleArgs.join(' ')}...`
    ));

    child_process.execFileSync(cmd, gradleArgs, {
      stdio: [process.stdin, process.stdout, process.stderr],
    });
  } catch (e) {
    console.log(chalk.red(
      'Could not install the app on the device, read the error above for details.\n' +
      'Make sure you have an Android emulator running or a device connected and have\n' +
      'set up your Android development environment:\n' +
      'https://facebook.github.io/react-native/docs/android-setup.html'
    ));
    // stderr is automatically piped from the gradle process, so the user
    // should see the error already, there is no need to do
    // `console.log(e.stderr)`
    reject();
    return;
  }

  try {
    const packageName = fs.readFileSync(
      'app/src/main/AndroidManifest.xml',
      'utf8'
    ).match(/package="(.+?)"/)[1];

    const adbPath = process.env.ANDROID_HOME
      ? process.env.ANDROID_HOME + '/platform-tools/adb'
      : 'adb';

    const devices = adb.getDevices();

    if (devices && devices.length > 0) {
      devices.forEach((device) => {

        const adbArgs = ['-s', device, 'shell', 'am', 'start', '-n', packageName + '/.MainActivity'];

        console.log(chalk.bold(
          `Starting the app on ${device} (${adbPath} ${adbArgs.join(' ')})...`
        ));

        child_process.spawnSync(adbPath, adbArgs, {stdio: 'inherit'});
      });
    } else {
      // If we cannot execute based on adb devices output, fall back to
      // shell am start
      const fallbackAdbArgs = [
        'shell', 'am', 'start', '-n', packageName + '/.MainActivity'
      ];
      console.log(chalk.bold(
        `Starting the app (${adbPath} ${fallbackAdbArgs.join(' ')}...`
      ));
      child_process.spawnSync(adbPath, fallbackAdbArgs, {stdio: 'inherit'});
    }

  } catch (e) {
    console.log(chalk.red(
      `adb invocation failed. Do you have adb in your PATH?`
    ));
    // stderr is automatically piped from the gradle process, so the user
    // should see the error already, there is no need to do
    // `console.log(e.stderr)`
    reject();
    return;
  }
}