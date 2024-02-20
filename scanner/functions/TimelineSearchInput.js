function TimelineSearchInput(props) {
  const {
    searchInputContainerRef
  } = Object(react["useContext"])(TimelineContext);
  const {
    dispatch,
    searchIndex,
    searchResults,
    searchText
  } = Object(react["useContext"])(TimelineSearchContext);

  if (searchInputContainerRef.current === null) {
    return null;
  }

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

  return /*#__PURE__*/Object(react_dom["createPortal"])( /*#__PURE__*/react["createElement"](SearchInput_SearchInput, {
    goToNextResult: goToNextResult,
    goToPreviousResult: goToPreviousResult,
    placeholder: "Search components by name",
    search: search,
    searchIndex: searchIndex,
    searchResultsCount: searchResults.length,
    searchText: searchText
  }), searchInputContainerRef.current);
}