function* fetchRelatedArtistsAndTopTracks({ artistId, delayLength }) {
  // Make our API calls. We also want to add a small buffer to delayLength,
  // so that these calls perform their updates _after_ the graph animations are
  // complete)
  yield put(updateLoadingStatus(true));

  const [ related, top ] = yield [
    call( fetchRelatedArtists, artistId ),
    call( fetchTopTracks, artistId ),
    delay(delayLength + 50)
  ];

  const artistsInState = yield select( state => state.get('artists'));
  const first3Related = takeFirstFewUnseenArtists(related.artists, artistsInState);

  yield [
    put(addArtists(first3Related)),
    put(addRelatedArtistsToGraph(first3Related)),
    put(loadTracks(top.tracks, artistId)),
    put(selectArtistForTracks(artistId))
  ];

  yield put(updateLoadingStatus(false));
}