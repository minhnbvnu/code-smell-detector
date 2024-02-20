function* progressWithArtist(artist) {
  yield [
    put(captureGraphState()),
    put(stop())
  ];

  yield put(centerGraphAroundVertex(artist));

  yield fetchRelatedArtistsAndTopTracks({
    artistId: artist.get('id'),
    delayLength: repositionDelay + repositionLength
  });
}