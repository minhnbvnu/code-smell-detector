function fetchTopTracks(artistId) {
  return fetchFromAPI({
    root:     SPOTIFY_ROOT,
    endpoint: `artists/${artistId}/top-tracks`,
    params:   { country: 'US' }
  });
}