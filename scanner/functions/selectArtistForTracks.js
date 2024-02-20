function selectArtistForTracks(artistId) {
  return {
    type: SELECT_ARTIST_FOR_TRACKS,
    artistId
  };
}