function* initializeWithArtist(artist, appMode) {
  const artistId = artist.get('id');

  // It's possible we don't have all the info we need yet;
  // If the user came to a specific URL, all we have is the ID.
  const artistDataLoaded = artist.get('type') === 'artist';

  if ( !artistDataLoaded ) {
    yield put(updateLoadingStatus(true));

    const [ artistData, top ] = yield [
      call( fetchArtistInfo, artistId ),
      call( fetchTopTracks, artistId )
    ];

    yield [
      put(loadTracks(top.tracks, artistId)),
      put(selectArtistForTracks(artistId))
    ];

    artist = fromJS(artistData);
  }

  yield put(updateMode('graph'));
  yield put(captureGraphState());
  yield put(updateLoadingStatus(true));

  yield put(updateRepositionStatus(false));

  // Wait half a second for the "search" component to fade away
  if ( appMode === 'search' ) yield delay(1000);

  yield [
    put(addArtists(artist)),
    put(setupInitialStage(artist))
  ];
  // Wait for the artist node to fade in, and the avatar to pop up.
  yield delay(vertexEnterLength);

  // Clear the typeahead, in case the user goes back to search
  yield put(clearTypeahead());

  yield fetchRelatedArtistsAndTopTracks({
    artistId,
    delayLength: 0
  });
}