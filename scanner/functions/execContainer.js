async function execContainer(container, opts, outputStream, errorStream) {
  outputStream = process.stdout;
  errorStream = process.stderr;
  const logStream = await container.logs({
    stdout: true,
    stderr: true,
    follow: true,
    since: (new Date().getTime() / 1000)
  });
  container.modem.demuxStream(logStream, outputStream, errorStream);
  const exec = await container.exec(opts);
  const stream = await exec.start();
  // have to wait, otherwise stdin may not be readable
  await new Promise(resolve => setTimeout(resolve, 30));
  container.modem.demuxStream(stream, outputStream, errorStream);

  await waitForExec(exec);
  logStream.destroy();
}