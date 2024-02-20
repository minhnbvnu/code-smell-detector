function fetchAndStoreAccessToken() {
  // To make authenticated requests to Spotify (and benefit from a higher rate-
  // limit), we need to proxy a request for an access token through our server.
  // The first step is to check if we already have it, in localStorage.
  const storedTokenString = localStorage.getItem(TOKEN_KEY);

  if ( storedTokenString ) {
    const storedToken = JSON.parse(storedTokenString);

    // If it's still valid, we don't need to make a server request :)
    if ( isTokenStillValid(storedToken) ) return;
  }

  // Don't allow multiple fetches to occur simultaneously.
  if ( isFetching ) return;
  isFetching = true;

  // Make a request to our back-end to generate a token.
  fetchFromAPI({ endpoint: AUTH_ENDPOINT })
    .then( response => {
      console.log({response})
      // The received token will be of type:
      // {
      //  "access_token": "BQCHMB...rDw",
      //  "token_type": "Bearer",
      //  "expires_in": 3600
      // }
      //
      // We want to convert that `expires_in` into a unix timestamp.
      //
      // We're also going to subtract 20s, since the countdown started from
      // when the token was generated, on Spotify's servers.
      const expiresInMs = (response.expires_in - 20) * 1000;
      const expirationTimestamp = Date.now() + expiresInMs;

      const token = {
        value:      response.access_token,
        expiration: expirationTimestamp
      };

      localStorage.setItem(TOKEN_KEY, JSON.stringify(token));

      isFetching = false;
    })
    .catch( err => console.error("Error fetching token from server", err) );
}