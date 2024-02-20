function loadTracks(tracks, artistId) {
  tracks = tracks.slice(0, 3).map( track => ({
    id:   track.id,
    url:  track.preview_url,
    name: track.name,
    artistId
  }));

  return {
    type: LOAD_TRACKS,
    artistId,
    tracks
  };
}