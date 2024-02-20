async function runContainer(opts, outputStream, errorStream, context = {}) {
  const container = await createContainer(opts);

  const attachOpts = {
    hijack: true,
    stream: true,
    stdin: true,
    stdout: true,
    stderr: true
  };

  const stream = await container.attach(attachOpts);

  if (!outputStream) {
    outputStream = process.stdout;
  }

  if (!errorStream) {
    errorStream = process.stderr;
  }

  const errorTransform = processorTransformFactory({
    serviceName: context.serviceName,
    functionName: context.functionName,
    errorStream: errorStream
  });

  if (!isWin) {
    container.modem.demuxStream(stream, outputStream, errorTransform);
  }

  await container.start();

  // dockerode bugs on windows. attach could not receive output and error
  if (isWin) {
    const logStream = await container.logs({
      stdout: true,
      stderr: true,
      follow: true
    });

    container.modem.demuxStream(logStream, outputStream, errorTransform);
  }

  containers.add(container.id);

  return { 
    container,
    stream
  };
}