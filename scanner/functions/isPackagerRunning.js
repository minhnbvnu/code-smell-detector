function isPackagerRunning() {
  return fetch('http://localhost:8081/status').then(
    res => res.text().then(body =>
      body === 'packager-status:running' ? 'running' : 'unrecognized'
    ),
    () => 'not_running'
  );
}