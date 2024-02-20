function sendRecentSearch({ id, name }) {
  return postToAPI({
    endpoint: 'searched_artists',
    body:     {
      spotifyArtistId: id,
      name
    }
  });
}