function exchangeCodeForToken(code, redirect_uri) {
  if (!code)
    return Promise.reject('code not provided');

  var params = {
      code: code,
      client_id: manifest.oauth2.client_id,
      // client_secret: manifest.oauth2.client_secret,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code',
      access_type: 'offline',
  };

  params.redirect_uri = 'urn:ietf:wg:oauth:2.0:oob';

  var str = Object.keys(params)
  .map(k => `${k}=` + encodeURIComponent(params[k]))
  .join('&')

  var request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: str
  };

  return fetch('https://www.googleapis.com/oauth2/v4/token', request)
  .then(function(res) {
    if (res.status != 200)
      return Promise.reject('received status: ' + res.status);
    return res.json();
  });
}