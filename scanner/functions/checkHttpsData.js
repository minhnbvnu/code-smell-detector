function checkHttpsData(data, t) {
  t.ok(isInteger(data.time), 'Timestamp is an integer');
  t.equals(data.method, 'GET', 'Should report GET as HTTPS request method');
  t.equals(data.url, '/', 'Should report / as URL');
  t.equals(data.hasOwnProperty('duration'), true, 'Should have HTTPS property duration;');
  t.ok(isNumeric(data.duration), 'duration is a number');
  t.equals(data.hasOwnProperty('header'), true, 'Should have HTTPS property header;');
  t.equals(data.hasOwnProperty('statusCode'), true, 'Should have HTTPS property statusCode;');
  t.ok(isInteger(data.statusCode), 'statusCode is an integer');
  t.equals(data.hasOwnProperty('contentType'), true, 'Should have HTTPS property contentType;');
  t.equals(data.hasOwnProperty('requestHeader'), true, 'Should have HTTPS property requestHeader;');
}