function tearDown(ps, t) {
  t.tearDown(() => {
    ps.kill('SIGTERM');
  });
}