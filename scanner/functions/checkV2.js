function checkV2 () {
  var sliceFrom = 13;
  discovery.getRobotPublicInfo(host, function (e, robotData) {
    console.log('Robot Data:');
    console.log(robotData);
  });
  const packet = 'f005efcc3b2900';
  var client = tls.connect(8883, host, {timeout: 10000, rejectUnauthorized: false, ciphers: process.env.ROBOT_CIPHERS || 'AES128-SHA256'}, function () {
    client.write(new Buffer(packet, 'hex'));
  });

  client.on('data', function (data) {
    if (data.length === 2) {
      sliceFrom = 9;
      return;
    }
    if (data.length <= 7) {
      console.log('Error getting password. Follow the instructions and try again.');
    } else {
      console.log('Password=> ' + new Buffer(data).slice(sliceFrom).toString() + ' <= Yes, all this string.');
      console.log('Use this credentials in dorita980 lib :)');
    }
    client.end();
    process.exit(0);
  });

  client.setEncoding('utf-8');
}