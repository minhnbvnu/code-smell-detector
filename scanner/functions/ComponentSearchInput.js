function ComponentSearchInput(props) {
  const {
    searchIndex,
    searchResults,
    searchText
  } = Object(react["useContext"])(TreeStateContext);
  const dispatch = Object(react["useContext"])(TreeDispatcherContext);

  const search = text => dispatch({
    type: 'SET_SEARCH_TEXT',
    payload: text
  });

  const goToNextResult = () => dispatch({
    type: 'GO_TO_NEXT_SEARCH_RESULT'
  });

  const goToPreviousResult = () => dispatch({
    type: 'GO_TO_PREVIOUS_SEARCH_RESULT'
  });

  return /*#__PURE__*/react["createElement"](SearchInput_SearchInput, {
    goToNextResult: goToNextResult,
    goToPreviousResult: goToPreviousResult,
    placeholder: "Search (text or /regex/)",
    search: search,
    searchIndex: searchIndex,
    searchResultsCount: searchResults.length,
    searchText: searchText,
    testName: "ComponentSearchInput"
  });
}