function getAccessTokenFromLocalStorage() {
  const accessTokenObject = JSON.parse(localStorage.getItem(TOKEN_KEY));

  // If there isn't a token yet, don't worry about it. Return null.
  if ( !accessTokenObject ) return null;

  // If there is a token, and it's still valid, we can just return it.
  if ( isTokenStillValid(accessTokenObject) ) return accessTokenObject.value;

  // If the token is expired, we want to return `null`.
  // We'll make a request for a new token, but we won't stick around for it.
  // We can get away with this because tokens are _optional_. They increase the
  // rate limit, so they're generally a good idea, but it's better to make the
  // request immediately sans-token, rather than waiting for a new one.
  fetchAndStoreAccessToken();
  return null;
}