function loginGigyaResponseHandler (error, response, body) {
  if (error) {
    console.log('Fatal error login into Gigya API. Please check your credentials or Gigya API Key.');
    console.log(error);
    process.exit(1);
  }

  if (response.statusCode === 401 || response.statusCode === 403) {
    console.log('Authentication error. Check your credentials.');
    console.log(response);
    process.exit(1);
  } else if (response.statusCode === 400) {
    console.log(response);
    process.exit(1);
  } else if (response.statusCode === 200) {
    if (body && body.statusCode && body.statusCode === 403) {
      console.log('Authentication error. Please check your credentials.');
      console.log(body);
      process.exit(1);
    }
    if (body && body.statusCode && body.statusCode === 400) {
      console.log('Error login into Gigya API.');
      console.log(body);
      process.exit(1);
    }
    if (body && body.statusCode && body.statusCode === 200 && body.errorCode === 0 && body.UID && body.UIDSignature && body.signatureTimestamp && body.sessionInfo && body.sessionInfo.sessionToken) {
      const iRobotLoginOptions = {
        'method': 'POST',
        'uri': 'https://unauth2.prod.iot.irobotapi.com/v2/login',
        'json': true,
        'body': {
          'app_id': 'ANDROID-C7FB240E-DF34-42D7-AE4E-A8C17079A294',
          'assume_robot_ownership': 0,
          'gigya': {
            'signature': body.UIDSignature,
            'timestamp': body.signatureTimestamp,
            'uid': body.UID
          }
        },
        'headers': {
          'Connection': 'close'
        }
      };
      request(iRobotLoginOptions, loginIrobotResponseHandler);
    } else {
      console.log('Error login into iRobot account. Missing fields in login response.');
      console.log(body);
      process.exit(1);
    }
  } else {
    console.log('Unespected response. Checking again...');
  }
}