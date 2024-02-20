function cli(args, done) {
  child_process.execFile(resolve('..', 'bin', 'index.js'), args, {
    cwd : __dirname
  }, function(err, stdout, stderr) {
    if (!err) {
      stdout = stdout.toString();
      stderr = stderr.toString();
      done.stdout && expect(stdout).match(done.stdout);
      done.stderr && expect(stderr).match(done.stderr);
    }
    done.done && done.done(err, stdout, stderr);
  });
}