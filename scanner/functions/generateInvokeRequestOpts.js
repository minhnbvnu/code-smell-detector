function generateInvokeRequestOpts(port, fcReqHeaders, event) {
  const opts = {
    method: 'POST',
    headers: fcReqHeaders,
    uri: `http://localhost:${port}/invoke`,
    resolveWithFullResponse: true
  };
  if (event.toString('utf8') !== '') {
    opts.body = event;
  }
  debug('local invoke request options: %j', opts);
  return opts;
}