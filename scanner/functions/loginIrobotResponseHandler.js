function loginIrobotResponseHandler (error, response, body) {
  if (error) {
    console.log('Fatal error login into iRobot account. Please check your credentials or API Key.');
    console.log(error);
    process.exit(1);
  }
  if (body && body.robots) {
    const robotCount = Object.keys(body.robots).length;
    console.log('Found ' + robotCount + ' robot(s)!');
    Object.keys(body.robots).map(function (r) {
      console.log('Robot "' + body.robots[r].name + '" (sku: ' + body.robots[r].sku + ' SoftwareVer: ' + body.robots[r].softwareVer + '):');
      console.log('BLID=> ' + r);
      console.log('Password=> ' + body.robots[r].password + ' <= Yes, all this string.');
      console.log('');
    });
    console.log('Use this credentials in dorita980 lib :)');
  } else {
    console.log('Fatal error login into iRobot account. Please check your credentials or API Key.');
    console.log(body);
    process.exit(1);
  }
}