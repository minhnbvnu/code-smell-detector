function checkHttpData(data, t) {
  t.ok(isInteger(data.time), 'Timestamp is an integer');
  t.equals(data.method, 'GET', 'Should report GET as HTTP request method');
  t.equals(data.url, '/', 'Should report / as URL');
  t.equals(data.hasOwnProperty('duration'), true, 'Should have HTTP property duration;');
  t.ok(isNumeric(data.duration), 'duration is a number');
  t.equals(data.hasOwnProperty('header'), true, 'Should have HTTP property header;');
  t.equals(data.hasOwnProperty('statusCode'), true, 'Should have HTTP property statusCode;');
  t.ok(isInteger(data.statusCode), 'statusCode is an integer');
  t.equals(data.hasOwnProperty('contentType'), true, 'Should have HTTP property contentType;');
  t.equals(data.hasOwnProperty('requestHeader'), true, 'Should have HTTP property requestHeader;');
}