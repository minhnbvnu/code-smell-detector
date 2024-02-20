function fetchFromAPI({root, endpoint, params}) {
  let url     = [root, endpoint].join('/');
  let options = {};

  if ( params ) {
    const paramString = toPairs(params).map(param => param.join('=')).join('&');
    url += `?${paramString}`;
  }

  const spotifyToken = getAccessTokenFromLocalStorage();

  // If this is a request to Spotify, we may want to append our accessToken.
  if ( root === SPOTIFY_ROOT && spotifyToken ) {
    options.headers = { 'Authorization': `Bearer ${spotifyToken}` };
  }

  return fetch(url, options)
    .then(checkStatus)
    .then( response => response.json() );
}