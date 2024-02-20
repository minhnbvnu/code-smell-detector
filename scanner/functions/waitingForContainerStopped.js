function waitingForContainerStopped() {
  // see https://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js
  const isRaw = process.isRaw;
  const kpCallBack = (_char, key) => {
    if (key & key.ctrl && key.name === 'c') {
      process.emit('SIGINT');
    }
  };
  if (process.platform === 'win32') {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(isRaw);
    }
    process.stdin.on('keypress', kpCallBack);
  }

  let stopping = false;

  process.on('SIGINT', async () => {

    debug('containers length: ', containers.length);

    if (stopping) {
      return;
    }

    // Just fix test on windows
    // Because process.emit('SIGINT') in test/docker.test.js will not trigger rl.on('SIGINT')
    // And when listening to stdin the process never finishes until you send a SIGINT signal explicitly.
    process.stdin.destroy();

    if (!containers.size) {
      return;
    }

    stopping = true;

    console.log(`\nreceived canncel request, stopping running containers.....`);

    const jobs = [];

    for (let container of containers) {
      try {
        if (container.destroy) { // container stream
          container.destroy();
        } else {
          const c = docker.getContainer(container);
          console.log(`stopping container ${container}`);

          jobs.push(c.kill().catch(ex => debug('kill container instance error, error is', ex)));
        }
      } catch (error) {
        debug('get container instance error, ignore container to stop, error is', error);
      }
    }

    try {
      await Promise.all(jobs);
      console.log('all containers stopped');
    } catch (error) {
      console.error(error);
      process.exit(-1); // eslint-disable-line
    }
  });

  return () => {
    process.stdin.removeListener('keypress', kpCallBack);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(isRaw);
    }
  };
}