async function startContainer(opts, outputStream, errorStream, context = {}) {

  const container = await createContainer(opts);

  containers.add(container.id);

  try {
    await container.start({});
  } catch (err) {
    console.error(err);
  }

  const logs = outputStream || errorStream;

  if (logs) {
    if (!outputStream) {
      outputStream = devnull();
    }

    if (!errorStream) {
      errorStream = devnull();
    }

    // dockerode bugs on windows. attach could not receive output and error, must use logs
    const logStream = await container.logs({
      stdout: true,
      stderr: true,
      follow: true
    });

    container.modem.demuxStream(logStream, outputStream, processorTransformFactory({
      serviceName: context.serviceName,
      functionName: context.functionName,
      errorStream
    }));
  }

  return {
    stop: async () => {
      await container.stop();
      containers.delete(container.id);
    },

    exec: async (cmd, { cwd = '', env = {}, outputStream, errorStream, verbose = false, context = {}, event = null } = {}) => {
      const stdin = event ? true : false;

      const options = {
        Env: dockerOpts.resolveDockerEnv(env),
        Tty: false,
        AttachStdin: stdin,
        AttachStdout: true,
        AttachStderr: true,
        WorkingDir: cwd
      };
      if (cmd !== []) {
        options.Cmd = cmd;
      }

      // docker exec
      debug('docker exec opts: ' + JSON.stringify(options, null, 4));

      const exec = await container.exec(options);

      const stream = await exec.start({ hijack: true, stdin });

      // todo: have to wait, otherwise stdin may not be readable
      await new Promise(resolve => setTimeout(resolve, 30));

      if (event !== null) {
        writeEventToStreamAndClose(stream, event);
      }

      if (!outputStream) {
        outputStream = process.stdout;
      }

      if (!errorStream) {
        errorStream = process.stderr;
      }

      if (verbose) {
        container.modem.demuxStream(stream, outputStream, errorStream);
      } else {
        container.modem.demuxStream(stream, devnull(), errorStream);
      }

      return await waitForExec(exec);
    }
  };
}