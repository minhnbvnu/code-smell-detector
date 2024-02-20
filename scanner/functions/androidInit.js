function androidInit(token) {
    // Push the token into the user data
    try {
      $ionicUser.push('_push.android_tokens', token, true);
    } catch(e) {
      console.warn('Received push token before user was identified and will not be synced with ionic.io. Make sure to call $ionicUser.identify() before calling $ionicPush.register.');
    }
  }