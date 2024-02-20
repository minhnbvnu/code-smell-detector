function maybeRefreshToken(key) {
  try {
    var tokenInfo = JSON.parse(localStorage.getItem(key));
    if (!tokenInfo.refresh_token || !tokenInfo.expires)
      throw new Error();
  }
  catch (e) {
    return Promise.reject('not logged in');
  }

  if (tokenInfo.access_token && tokenInfo.expires >= Date.now())
    return Promise.resolve(tokenInfo);

  var params = {
      client_id: manifest.oauth2.client_id,
      // client_secret: manifest.oauth2.client_secret,
      refresh_token: tokenInfo.refresh_token,
      grant_type: 'refresh_token',
  };

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
    // don't bother error checking for status codes, just validate the json.
    return res.json();
  })
  .then(function(json) {
    if (!json.access_token || !json.expires_in || !json.token_type) {
      // check to see if this refresh token is revoked or something.
      (json.error == 'invalid_grant')
        localStorage.removeItem(key);
      throw new Error('refresh token failed: ' + JSON.stringify(json));
    }
    tokenInfo.access_token = json.access_token;
    tokenInfo.expires_in = json.expires_in;
    tokenInfo.token_type = json.token_type;
    saveToken(key, tokenInfo);
    return tokenInfo;
  })
}