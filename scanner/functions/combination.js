function combination(down, cookies) {

  var header = [];
  header.push('Cookie: ' + cookies);
  header.push('User-Agent: ' + navigator.userAgent);
  header.push('Connection: keep-alive');
  header.push('Referer: ' + down.referrer);

  if (down.filename == '') {
    var post_obj = {
      'jsonrpc': '2.0',
      'method': 'aria2.addUri',
      'id': (new Date()).getTime().toString(),
      'params': [[down.finalUrl], {
        'header': header
      }]
    };
  } else {
    var post_obj = {
      'jsonrpc': '2.0',
      'method': 'aria2.addUri',
      'id': (new Date()).getTime().toString(),
      'params': [[down.finalUrl], {
        'out': decodeURIComponent(down.filename),
        'header': header
      }]
    };
  }
  return post_obj;
}