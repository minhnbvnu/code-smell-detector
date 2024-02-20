async function startSboxContainer({
  runtime, imageName,
  mounts, cmd, envs,
  isTty, isInteractive
}) {
  debug(`runtime: ${runtime}`);
  debug(`mounts: ${mounts}`);
  debug(`isTty: ${isTty}`);
  debug(`isInteractive: ${isInteractive}`);

  if (!imageName) {
    imageName = await dockerOpts.resolveRuntimeToDockerImage(runtime, true);
    if (!imageName) {
      throw new Error(`invalid runtime name ${runtime}`);
    }
  }

  debug(`cmd: ${parseArgsStringToArgv(cmd || '')}`);

  const container = await createContainer(dockerOpts.generateSboxOpts({
    imageName,
    hostname: `fc-${runtime}`,
    mounts,
    envs,
    cmd: parseArgsStringToArgv(cmd || ''),
    isTty,
    isInteractive
  }));

  containers.add(container.id);

  await container.start();

  const stream = await container.attach({
    logs: true,
    stream: true,
    stdin: isInteractive,
    stdout: true,
    stderr: true
  });

  // show outputs
  let logStream;
  if (isTty) {
    stream.pipe(process.stdout);
  } else {
    if (isInteractive || process.platform === 'win32') {
      // 这种情况很诡异，收不到 stream 的 stdout，使用 log 绕过去。
      logStream = await container.logs({
        stdout: true,
        stderr: true,
        follow: true
      });
      container.modem.demuxStream(logStream, process.stdout, process.stderr);
    } else {
      container.modem.demuxStream(stream, process.stdout, process.stderr);
    }

  }

  if (isInteractive) {
    displaySboxTips(runtime);

    // Connect stdin
    process.stdin.pipe(stream);

    let previousKey;
    const CTRL_P = '\u0010', CTRL_Q = '\u0011';

    process.stdin.on('data', (key) => {
      // Detects it is detaching a running container
      const keyStr = key.toString('ascii');
      if (previousKey === CTRL_P && keyStr === CTRL_Q) {
        container.stop(() => { });
      }
      previousKey = keyStr;
    });

  }

  let resize;

  const isRaw = process.isRaw;
  if (isTty) {
    // fix not exit process in windows
    goThrough();

    process.stdin.setRawMode(true);

    resize = async () => {
      const dimensions = {
        h: process.stdout.rows,
        w: process.stdout.columns
      };

      if (dimensions.h !== 0 && dimensions.w !== 0) {
        await container.resize(dimensions);
      }
    };

    await resize();
    process.stdout.on('resize', resize);

    // 在不加任何 cmd 的情况下 shell prompt 需要输出一些字符才会显示，
    // 这里输入一个空格+退格，绕过这个怪异的问题。
    stream.write(' \b');
  }

  await container.wait();

  // cleanup
  if (isTty) {
    process.stdout.removeListener('resize', resize);
    process.stdin.setRawMode(isRaw);
  }

  if (isInteractive) {
    process.stdin.removeAllListeners();
    process.stdin.unpipe(stream);

    /**
     *  https://stackoverflow.com/questions/31716784/nodejs-process-never-ends-when-piping-the-stdin-to-a-child-process?rq=1
     *  https://github.com/nodejs/node/issues/2276
     * */
    process.stdin.destroy();
  }

  if (logStream) {
    logStream.removeAllListeners();
  }

  stream.unpipe(process.stdout);

  // fix not exit process in windows
  // stream is hackji socks,so need to close
  stream.destroy();

  containers.delete(container.id);

  if (!isTty) {
    goThrough();
  }
}