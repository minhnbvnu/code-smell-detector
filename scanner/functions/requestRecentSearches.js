function requestRecentSearches() {
  return dispatch => {
    // Start by dispatching this action.
    // It's currently unused, but I may want to display something optimistic.
    dispatch({ type: REQUEST_RECENT_SEARCHES });

    fetchRecentSearches()
      .then( recentSearches => dispatch(receiveRecentSearches(recentSearches)) )
      .catch( err => dispatch(failureRecentSearches(err)) );
  };
}