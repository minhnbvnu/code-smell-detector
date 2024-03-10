  const reducer = Object(react["useMemo"])(() => (state, action) => {
    const {
      type
    } = action;

    switch (type) {
      case 'GO_TO_NEXT_SEARCH_RESULT':
      case 'GO_TO_PREVIOUS_SEARCH_RESULT':
      case 'HANDLE_STORE_MUTATION':
      case 'RESET_OWNER_STACK':
      case 'SELECT_ELEMENT_AT_INDEX':
      case 'SELECT_ELEMENT_BY_ID':
      case 'SELECT_CHILD_ELEMENT_IN_TREE':
      case 'SELECT_NEXT_ELEMENT_IN_TREE':
      case 'SELECT_NEXT_ELEMENT_WITH_ERROR_OR_WARNING_IN_TREE':
      case 'SELECT_NEXT_SIBLING_IN_TREE':
      case 'SELECT_OWNER_LIST_NEXT_ELEMENT_IN_TREE':
      case 'SELECT_OWNER_LIST_PREVIOUS_ELEMENT_IN_TREE':
      case 'SELECT_PARENT_ELEMENT_IN_TREE':
      case 'SELECT_PREVIOUS_ELEMENT_IN_TREE':
      case 'SELECT_PREVIOUS_ELEMENT_WITH_ERROR_OR_WARNING_IN_TREE':
      case 'SELECT_PREVIOUS_SIBLING_IN_TREE':
      case 'SELECT_OWNER':
      case 'UPDATE_INSPECTED_ELEMENT_ID':
      case 'SET_SEARCH_TEXT':
        state = reduceTreeState(store, state, action);
        state = reduceSearchState(store, state, action);
        state = reduceOwnersState(store, state, action);
        state = reduceSuspenseState(store, state, action); // If the selected ID is in a collapsed subtree, reset the selected index to null.
        // We'll know the correct index after the layout effect will toggle the tree,
        // and the store tree is mutated to account for that.

        if (state.selectedElementID !== null && store.isInsideCollapsedSubTree(state.selectedElementID)) {
          return { ...state,
            selectedElementIndex: null
          };
        }

        return state;

      default:
        throw new Error(`Unrecognized action "${type}"`);
    }
  }, [store]);