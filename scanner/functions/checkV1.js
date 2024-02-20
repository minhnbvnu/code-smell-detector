function checkV1 (rid) {
  if (rid === 120) {
    console.log('Timeout getting password. Are you following the instructions? You already setup your robot? Its the robot IP correct?');
    process.exit(1);
  }

  requestOptions.body = '{"do":"get","args":["passwd"],"id":' + rid + '}';

  request(requestOptions, function (error, response, body) {
    if (error) {
      console.log('Fatal error connecting to robot. Please verify the IP address and connectivity:', error);
      process.exit(1);
    }

    if (response.statusCode === 401) {
      setTimeout(function () { checkV1(++rid); }, 2000);
    } else if (response.statusCode === 200) {
      console.log('========>');
      let pass = JSON.parse(body).ok.passwd;
      console.log('Good job!');
      console.log('Password: ' + pass);
      getBlid(++rid, pass);
    } else {
      console.log('Unespected response. Checking again...');
      setTimeout(function () { checkV1(++rid); }, 2000);
    }
  });
}