function checkHttpsRequestData(data, t) {
  t.equals(data.method, 'GET', 'Should report GET as HTTPS request method');
  t.equals(data.url, '/', 'Should report / as URL');
  t.equals(data.hasOwnProperty('statusCode'), true, 'Should have HTTPS property statusCode;');
  t.ok(isInteger(data.statusCode), 'statusCode is an integer');
  t.equals(data.hasOwnProperty('requestHeader'), true, 'Should have HTTPS property requestHeader;');
  t.equals(data.hasOwnProperty('header'), true, 'Should have HTTPS property header;');
  t.equals(data.hasOwnProperty('contentType'), true, 'Should have HTTPS property contentType;');
}