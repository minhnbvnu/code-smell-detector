function fetchSearchResults(q, type = 'artist') {
  return fetchFromAPI({
    root:     SPOTIFY_ROOT,
    endpoint: 'search',
    params:   { q, type }
  });
}