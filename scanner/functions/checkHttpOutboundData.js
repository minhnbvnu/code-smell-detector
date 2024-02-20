function checkHttpOutboundData(data, t) {
  t.ok(isInteger(data.time), 'Timestamp is an integer');
  t.equals(data.method, 'GET', 'Should report GET as HTTP request method');
  t.equals(data.url, `https://localhost:${server.address().port}/`,
    `Should report https://localhost:${server.address().port}/ as URL`);
  if (data.requestHeaders) {
    t.equals(data.requestHeaders.hello, 'world', 'Should report world as value of hello header');
  }
}