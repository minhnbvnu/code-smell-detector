function getProfileUserInfo(token) {
  var request = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
  };

  return fetch('https://www.googleapis.com/oauth2/v1/userinfo', request)
  .then(function(res) {
    if (res.status != 200)
      return Promise.reject('received status: ' + res.status);
    return res.json();
  });
}