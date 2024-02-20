function fetchArtistInfo(artistId) {
  return fetchFromAPI({
    root:     SPOTIFY_ROOT,
    endpoint: `artists/${artistId}`
  });
}