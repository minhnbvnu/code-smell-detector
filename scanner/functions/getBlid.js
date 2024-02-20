function getBlid (rid, pass) {
  requestOptions.body = '{"do":"get","args":["sys"],"id":' + rid + '}';
  requestOptions.headers['Authorization'] = 'Basic ' + new Buffer('user:' + pass).toString('base64');

  request(requestOptions, function (error, response, body) {
    if (error) {
      console.log('Fatal error getting username/blid:', error);
      process.exit(1);
    }

    if (response.statusCode === 200) {
      const blid = JSON.parse(body).ok.blid.map(function (dec) {
        return (dec + 0x10000).toString(16).substr(-2).toUpperCase();
      }).join('');

      console.log('Username/blid: ' + blid);
      console.log('Use this credentials in dorita980 lib :)');
    } else {
      console.log('Unespected error getting username/blid');
    }
  });
}