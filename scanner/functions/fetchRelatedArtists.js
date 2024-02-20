function fetchRelatedArtists(artistId) {
  return fetchFromAPI({
    root:     SPOTIFY_ROOT,
    endpoint: `artists/${artistId}/related-artists`
  });
}