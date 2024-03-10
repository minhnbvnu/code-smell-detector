function reduceOwnersState(store, state, action) {
  let {
    numElements,
    selectedElementID,
    selectedElementIndex,
    ownerID,
    ownerFlatTree
  } = state;
  const {
    searchIndex,
    searchResults,
    searchText
  } = state;
  let prevSelectedElementIndex = selectedElementIndex;

  switch (action.type) {
    case 'HANDLE_STORE_MUTATION':
      if (ownerID !== null) {
        if (!store.containsElement(ownerID)) {
          ownerID = null;
          ownerFlatTree = null;
          selectedElementID = null;
        } else {
          ownerFlatTree = store.getOwnersListForElement(ownerID);

          if (selectedElementID !== null) {
            // Mutation might have caused the index of this ID to shift.
            selectedElementIndex = ownerFlatTree.findIndex(element => element.id === selectedElementID);
          }
        }
      } else {
        if (selectedElementID !== null) {
          // Mutation might have caused the index of this ID to shift.
          selectedElementIndex = store.getIndexOfElementID(selectedElementID);
        }
      }

      if (selectedElementIndex === -1) {
        // If we couldn't find this ID after mutation, unselect it.
        selectedElementIndex = null;
        selectedElementID = null;
      }

      break;

    case 'RESET_OWNER_STACK':
      ownerID = null;
      ownerFlatTree = null;
      selectedElementIndex = selectedElementID !== null ? store.getIndexOfElementID(selectedElementID) : null;
      break;

    case 'SELECT_ELEMENT_AT_INDEX':
      if (ownerFlatTree !== null) {
        selectedElementIndex = action.payload;
      }

      break;

    case 'SELECT_ELEMENT_BY_ID':
      if (ownerFlatTree !== null) {
        const payload = action.payload;

        if (payload === null) {
          selectedElementIndex = null;
        } else {
          selectedElementIndex = ownerFlatTree.findIndex(element => element.id === payload); // If the selected element is outside of the current owners list,
          // exit the list and select the element in the main tree.
          // This supports features like toggling Suspense.

          if (selectedElementIndex !== null && selectedElementIndex < 0) {
            ownerID = null;
            ownerFlatTree = null;
            selectedElementIndex = store.getIndexOfElementID(payload);
          }
        }
      }

      break;

    case 'SELECT_NEXT_ELEMENT_IN_TREE':
      if (ownerFlatTree !== null && ownerFlatTree.length > 0) {
        if (selectedElementIndex === null) {
          selectedElementIndex = 0;
        } else if (selectedElementIndex + 1 < ownerFlatTree.length) {
          selectedElementIndex++;
        }
      }

      break;

    case 'SELECT_PREVIOUS_ELEMENT_IN_TREE':
      if (ownerFlatTree !== null && ownerFlatTree.length > 0) {
        if (selectedElementIndex !== null && selectedElementIndex > 0) {
          selectedElementIndex--;
        }
      }

      break;

    case 'SELECT_OWNER':
      // If the Store doesn't have any owners metadata, don't drill into an empty stack.
      // This is a confusing user experience.
      if (store.hasOwnerMetadata) {
        ownerID = action.payload;
        ownerFlatTree = store.getOwnersListForElement(ownerID); // Always force reset selection to be the top of the new owner tree.

        selectedElementIndex = 0;
        prevSelectedElementIndex = null;
      }

      break;

    default:
      // React can bailout of no-op updates.
      return state;
  } // Changes in the selected owner require re-calculating the owners tree.


  if (ownerFlatTree !== state.ownerFlatTree || action.type === 'HANDLE_STORE_MUTATION') {
    if (ownerFlatTree === null) {
      numElements = store.numElements;
    } else {
      numElements = ownerFlatTree.length;
    }
  } // Keep selected item ID and index in sync.


  if (selectedElementIndex !== prevSelectedElementIndex) {
    if (selectedElementIndex === null) {
      selectedElementID = null;
    } else {
      if (ownerFlatTree !== null) {
        selectedElementID = ownerFlatTree[selectedElementIndex].id;
      }
    }
  }

  return { ...state,
    numElements,
    selectedElementID,
    selectedElementIndex,
    searchIndex,
    searchResults,
    searchText,
    ownerID,
    ownerFlatTree
  };
}