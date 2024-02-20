function receiveTypeaheadSuggestions(suggestedArtists) {
  return {
    type: RECEIVE_TYPEAHEAD_SUGGESTIONS,
    artists: suggestedArtists
  };
}