function fetchAccessToken() {
  return fetchFromAPI({
    endpoint: 'spotify_access_token'
  });
}