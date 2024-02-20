function reduceSearchState(store, state, action) {
  let {
    searchIndex,
    searchResults,
    searchText,
    selectedElementID,
    selectedElementIndex
  } = state;
  const ownerID = state.ownerID;
  const prevSearchIndex = searchIndex;
  const prevSearchText = searchText;
  const numPrevSearchResults = searchResults.length; // We track explicitly whether search was requested because
  // we might want to search even if search index didn't change.
  // For example, if you press "next result" on a search with a single
  // result but a different current selection, we'll set this to true.

  let didRequestSearch = false; // Search isn't supported when the owner's tree is active.

  if (ownerID === null) {
    switch (action.type) {
      case 'GO_TO_NEXT_SEARCH_RESULT':
        if (numPrevSearchResults > 0) {
          didRequestSearch = true;
          searchIndex = // $FlowFixMe[unsafe-addition] addition with possible null/undefined value
          searchIndex + 1 < numPrevSearchResults ? searchIndex + 1 : 0;
        }

        break;

      case 'GO_TO_PREVIOUS_SEARCH_RESULT':
        if (numPrevSearchResults > 0) {
          didRequestSearch = true;
          searchIndex = searchIndex > 0 ? searchIndex - 1 : numPrevSearchResults - 1;
        }

        break;

      case 'HANDLE_STORE_MUTATION':
        if (searchText !== '') {
          const [addedElementIDs, removedElementIDs] = action.payload;
          removedElementIDs.forEach((parentID, id) => {
            // Prune this item from the search results.
            const index = searchResults.indexOf(id);

            if (index >= 0) {
              searchResults = searchResults.slice(0, index).concat(searchResults.slice(index + 1)); // If the results are now empty, also deselect things.

              if (searchResults.length === 0) {
                searchIndex = null;
              } else if (searchIndex >= searchResults.length) {
                searchIndex = searchResults.length - 1;
              }
            }
          });
          addedElementIDs.forEach(id => {
            const element = store.getElementByID(id); // It's possible that multiple tree operations will fire before this action has run.
            // So it's important to check for elements that may have been added and then removed.

            if (element !== null) {
              const {
                displayName
              } = element; // Add this item to the search results if it matches.

              const regExp = createRegExp(searchText);

              if (displayName !== null && regExp.test(displayName)) {
                const newElementIndex = store.getIndexOfElementID(id);
                let foundMatch = false;

                for (let index = 0; index < searchResults.length; index++) {
                  const resultID = searchResults[index];

                  if (newElementIndex < store.getIndexOfElementID(resultID)) {
                    foundMatch = true;
                    searchResults = searchResults.slice(0, index).concat(resultID).concat(searchResults.slice(index));
                    break;
                  }
                }

                if (!foundMatch) {
                  searchResults = searchResults.concat(id);
                }

                searchIndex = searchIndex === null ? 0 : searchIndex;
              }
            }
          });
        }

        break;

      case 'SET_SEARCH_TEXT':
        searchIndex = null;
        searchResults = [];
        searchText = action.payload;

        if (searchText !== '') {
          const regExp = createRegExp(searchText);
          store.roots.forEach(rootID => {
            recursivelySearchTree(store, rootID, regExp, searchResults);
          });

          if (searchResults.length > 0) {
            if (prevSearchIndex === null) {
              if (selectedElementIndex !== null) {
                searchIndex = getNearestResultIndex(store, searchResults, selectedElementIndex);
              } else {
                searchIndex = 0;
              }
            } else {
              searchIndex = Math.min(prevSearchIndex, searchResults.length - 1);
            }
          }
        }

        break;

      default:
        // React can bailout of no-op updates.
        return state;
    }
  }

  if (searchText !== prevSearchText) {
    const newSearchIndex = searchResults.indexOf(selectedElementID);

    if (newSearchIndex === -1) {
      // Only move the selection if the new query
      // doesn't match the current selection anymore.
      didRequestSearch = true;
    } else {
      // Selected item still matches the new search query.
      // Adjust the index to reflect its position in new results.
      searchIndex = newSearchIndex;
    }
  }

  if (didRequestSearch && searchIndex !== null) {
    selectedElementID = searchResults[searchIndex];
    selectedElementIndex = store.getIndexOfElementID(selectedElementID);
  }

  return { ...state,
    selectedElementID,
    selectedElementIndex,
    searchIndex,
    searchResults,
    searchText
  };
}