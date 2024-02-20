async function remoteBuild(data) {
  const url = `http://59766a59fa0b4391b703b51d97230296-cn-hangzhou.alicloudapi.com/build/${data.runtime}`;

  const response = await httpx.request(url, {
    method: 'POST',
    timeout: 60000,
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify(data)
  });

  debug('%j', data);

  const statusCode = response.statusCode;

  var body = await httpx.read(response, 'utf8');
  const headers = response.headers;
  const contentType = headers['content-type'] || '';

  if (contentType.startsWith('application/json')) {
    body = JSON.parse(body);
  }

  if (statusCode !== 200) {
    debug(response.headers);
    debug('statusCode: %s', statusCode);
    debug('build dependencies failed!');
    let err = new Error(`${headers['x-ca-error-message']},` +
      ` requestid: ${headers['x-ca-request-id']}`);
    err.name = 'BuildError';
    err.data = data;
    throw err;
  }

  if (!body.ok) {
    let err = new Error(`Build failed, ${body.message}`);
    err.name = 'BuildError';
    err.data = data;
    throw err;
  }

  return body.data.zip;
}