async function runCertora(spec, contract, files, options = []) {
  const args = [...files, '--verify', `${contract}:certora/specs/${spec}.spec`, ...options];
  if (argv.verbose) {
    console.log('Running:', args.join(' '));
  }
  const child = proc.spawn('certoraRun', args);

  const stream = new PassThrough();
  const output = collect(stream);

  child.stdout.pipe(stream, { end: false });
  child.stderr.pipe(stream, { end: false });

  // as soon as we have a job id, print the output link
  stream.on('data', function logStatusUrl(data) {
    const { '-DjobId': jobId, '-DuserId': userId } = Object.fromEntries(
      data
        .toString('utf8')
        .match(/-D\S+=\S+/g)
        ?.map(s => s.split('=')) || [],
    );

    if (jobId && userId) {
      console.error(`[${spec}] https://prover.certora.com/output/${userId}/${jobId}/`);
      stream.off('data', logStatusUrl);
    }
  });

  // wait for process end
  const [code, signal] = await events.once(child, 'exit');

  // error
  if (code || signal) {
    console.error(`[${spec}] Exited with code ${code || signal}`);
    process.exitCode = 1;
  }

  // get all output
  stream.end();

  // write results in markdown format
  writeEntry(spec, contract, code || signal, (await output).match(/https:\/\/prover.certora.com\/output\/\S*/)?.[0]);

  // write all details
  console.error(`+ certoraRun ${args.join(' ')}\n` + (await output));
}