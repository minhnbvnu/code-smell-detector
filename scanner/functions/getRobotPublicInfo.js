function getRobotPublicInfo (ip, cb) {
  const server = dgram.createSocket('udp4');

  server.on('error', (err) => {
    server.close();
    cb(err);
  });

  server.on('message', (msg) => {
    try {
      let parsedMsg = JSON.parse(msg);
      if (parsedMsg.hostname && parsedMsg.ip && ((parsedMsg.hostname.split('-')[0] === 'Roomba') || (parsedMsg.hostname.split('-')[0] === 'iRobot'))) {
        server.close();
        parsedMsg.blid = parsedMsg.hostname.split('-')[1];
        cb(null, parsedMsg);
      }
    } catch (e) {}
  });

  server.bind(5678, function () {
    const message = new Buffer('irobotmcs');
    server.send(message, 0, message.length, 5678, ip);
  });
}