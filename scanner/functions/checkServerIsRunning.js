function checkServerIsRunning(url, ps, t) {
  request(url, (err, res) => {
    if (!err && res.statusCode !== 500) {
      t.pass('a successful request from the server was made');
    } else {
      t.fail('the server could not be reached');
    }
    ps.kill('SIGTERM');
  });
}