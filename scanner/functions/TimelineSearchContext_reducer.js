function TimelineSearchContext_reducer(state, action) {
  let {
    searchIndex,
    searchRegExp,
    searchResults,
    searchText
  } = state;

  switch (action.type) {
    case 'GO_TO_NEXT_SEARCH_RESULT':
      if (searchResults.length > 0) {
        if (searchIndex === -1 || searchIndex + 1 === searchResults.length) {
          searchIndex = 0;
        } else {
          searchIndex++;
        }
      }

      break;

    case 'GO_TO_PREVIOUS_SEARCH_RESULT':
      if (searchResults.length > 0) {
        if (searchIndex === -1 || searchIndex === 0) {
          searchIndex = searchResults.length - 1;
        } else {
          searchIndex--;
        }
      }

      break;

    case 'SET_SEARCH_TEXT':
      searchText = action.payload;
      searchRegExp = null;
      searchResults = [];

      if (searchText !== '') {
        const safeSearchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        searchRegExp = new RegExp(`^${safeSearchText}`, 'i'); // If something is zoomed in on already, and the new search still contains it,
        // don't change the selection (even if overall search results set changes).

        let prevSelectedMeasure = null;

        if (searchIndex >= 0 && searchResults.length > searchIndex) {
          prevSelectedMeasure = searchResults[searchIndex];
        }

        const componentMeasures = state.profilerData.componentMeasures;
        let prevSelectedMeasureIndex = -1;

        for (let i = 0; i < componentMeasures.length; i++) {
          const componentMeasure = componentMeasures[i];

          if (componentMeasure.componentName.match(searchRegExp)) {
            searchResults.push(componentMeasure);

            if (componentMeasure === prevSelectedMeasure) {
              prevSelectedMeasureIndex = searchResults.length - 1;
            }
          }
        }

        searchIndex = prevSelectedMeasureIndex >= 0 ? prevSelectedMeasureIndex : 0;
      }

      break;
  }

  return {
    profilerData: state.profilerData,
    searchIndex,
    searchRegExp,
    searchResults,
    searchText
  };
}