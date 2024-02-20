function TreeContextController({
  children,
  defaultInspectedElementID,
  defaultOwnerID,
  defaultSelectedElementID,
  defaultSelectedElementIndex
}) {
  const bridge = Object(react["useContext"])(BridgeContext);
  const store = Object(react["useContext"])(StoreContext);
  const initialRevision = Object(react["useMemo"])(() => store.revision, [store]); // This reducer is created inline because it needs access to the Store.
  // The store is mutable, but the Store itself is global and lives for the lifetime of the DevTools,
  // so it's okay for the reducer to have an empty dependencies array.

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
  const [state, dispatch] = Object(react["useReducer"])(reducer, {
    // Tree
    numElements: store.numElements,
    ownerSubtreeLeafElementID: null,
    selectedElementID: defaultSelectedElementID == null ? null : defaultSelectedElementID,
    selectedElementIndex: defaultSelectedElementIndex == null ? null : defaultSelectedElementIndex,
    // Search
    searchIndex: null,
    searchResults: [],
    searchText: '',
    // Owners
    ownerID: defaultOwnerID == null ? null : defaultOwnerID,
    ownerFlatTree: null,
    // Inspection element panel
    inspectedElementID: defaultInspectedElementID == null ? null : defaultInspectedElementID
  });
  const dispatchWrapper = Object(react["useCallback"])(action => {
    dispatch(action);
    Object(react["startTransition"])(() => {
      dispatch({
        type: 'UPDATE_INSPECTED_ELEMENT_ID'
      });
    });
  }, [dispatch]); // Listen for host element selections.

  Object(react["useEffect"])(() => {
    const handleSelectFiber = id => dispatchWrapper({
      type: 'SELECT_ELEMENT_BY_ID',
      payload: id
    });

    bridge.addListener('selectFiber', handleSelectFiber);
    return () => bridge.removeListener('selectFiber', handleSelectFiber);
  }, [bridge, dispatchWrapper]); // If a newly-selected search result or inspection selection is inside of a collapsed subtree, auto expand it.
  // This needs to be a layout effect to avoid temporarily flashing an incorrect selection.

  const prevSelectedElementID = Object(react["useRef"])(null);
  Object(react["useLayoutEffect"])(() => {
    if (state.selectedElementID !== prevSelectedElementID.current) {
      prevSelectedElementID.current = state.selectedElementID;

      if (state.selectedElementID !== null) {
        const element = store.getElementByID(state.selectedElementID);

        if (element !== null && element.parentID > 0) {
          store.toggleIsCollapsed(element.parentID, false);
        }
      }
    }
  }, [state.selectedElementID, store]); // Mutations to the underlying tree may impact this context (e.g. search results, selection state).

  Object(react["useEffect"])(() => {
    const handleStoreMutated = ([addedElementIDs, removedElementIDs]) => {
      dispatchWrapper({
        type: 'HANDLE_STORE_MUTATION',
        payload: [addedElementIDs, removedElementIDs]
      });
    }; // Since this is a passive effect, the tree may have been mutated before our initial subscription.


    if (store.revision !== initialRevision) {
      // At the moment, we can treat this as a mutation.
      // We don't know which Elements were newly added/removed, but that should be okay in this case.
      // It would only impact the search state, which is unlikely to exist yet at this point.
      dispatchWrapper({
        type: 'HANDLE_STORE_MUTATION',
        payload: [[], new Map()]
      });
    }

    store.addListener('mutated', handleStoreMutated);
    return () => store.removeListener('mutated', handleStoreMutated);
  }, [dispatchWrapper, initialRevision, store]);
  return /*#__PURE__*/react["createElement"](TreeStateContext.Provider, {
    value: state
  }, /*#__PURE__*/react["createElement"](TreeDispatcherContext.Provider, {
    value: dispatchWrapper
  }, children));
}