function* watchSelectArtist() {
  while (true) {
    const action = yield take(SELECT_ARTIST);

    // Figure out if the board is already set up, or if this is our initial artist.
    // On first invocation, from the search form or from a direct URL, our role is
    // different. We need to add our first node to the board.
    // For subsequent invocations, the job is different: Shifting everything down
    // one position.
    const appMode = yield select( state => state.getIn(['app', 'mode']));
    const isInitialArtist = appMode !== 'graph';
    const artist = action.artist;

    yield isInitialArtist
      ? initializeWithArtist(artist, appMode)
      : progressWithArtist(artist);
  }
}