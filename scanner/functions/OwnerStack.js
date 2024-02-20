function OwnerStack() {
  const read = Object(react["useContext"])(OwnersListContext);
  const {
    ownerID
  } = Object(react["useContext"])(TreeStateContext);
  const treeDispatch = Object(react["useContext"])(TreeDispatcherContext);
  const [state, dispatch] = Object(react["useReducer"])(dialogReducer, {
    ownerID: null,
    owners: [],
    selectedIndex: 0
  }); // When an owner is selected, we either need to update the selected index, or we need to fetch a new list of owners.
  // We use a reducer here so that we can avoid fetching a new list unless the owner ID has actually changed.

  if (ownerID === null) {
    dispatch({
      type: 'UPDATE_OWNER_ID',
      ownerID: null,
      owners: []
    });
  } else if (ownerID !== state.ownerID) {
    const isInStore = state.owners.findIndex(owner => owner.id === ownerID) >= 0;
    dispatch({
      type: 'UPDATE_OWNER_ID',
      ownerID,
      owners: isInStore ? state.owners : read(ownerID) || []
    });
  }

  const {
    owners,
    selectedIndex
  } = state;
  const selectOwner = Object(react["useCallback"])(owner => {
    if (owner !== null) {
      const index = owners.indexOf(owner);
      dispatch({
        type: 'UPDATE_SELECTED_INDEX',
        selectedIndex: index >= 0 ? index : 0
      });
      treeDispatch({
        type: 'SELECT_OWNER',
        payload: owner.id
      });
    } else {
      dispatch({
        type: 'UPDATE_SELECTED_INDEX',
        selectedIndex: 0
      });
      treeDispatch({
        type: 'RESET_OWNER_STACK'
      });
    }
  }, [owners, treeDispatch]);
  const [elementsTotalWidth, setElementsTotalWidth] = Object(react["useState"])(0);
  const elementsBarRef = Object(react["useRef"])(null);
  const isOverflowing = useIsOverflowing(elementsBarRef, elementsTotalWidth);
  const selectedOwner = owners[selectedIndex];
  Object(react["useLayoutEffect"])(() => {
    // If we're already overflowing, then we don't need to re-measure items.
    // That's because once the owners stack is open, it can only get larger (by drilling in).
    // A totally new stack can only be reached by exiting this mode and re-entering it.
    if (elementsBarRef.current === null || isOverflowing) {
      return () => {};
    }

    let totalWidth = 0;

    for (let i = 0; i < owners.length; i++) {
      const element = elementsBarRef.current.children[i];
      const computedStyle = getComputedStyle(element);
      totalWidth += element.offsetWidth + parseInt(computedStyle.marginLeft, 10) + parseInt(computedStyle.marginRight, 10);
    }

    setElementsTotalWidth(totalWidth);
  }, [elementsBarRef, isOverflowing, owners.length]);
  return /*#__PURE__*/react["createElement"]("div", {
    className: OwnersStack_default.a.OwnerStack
  }, /*#__PURE__*/react["createElement"]("div", {
    className: OwnersStack_default.a.Bar,
    ref: elementsBarRef
  }, isOverflowing && /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"](ElementsDropdown, {
    owners: owners,
    selectedIndex: selectedIndex,
    selectOwner: selectOwner
  }), /*#__PURE__*/react["createElement"](BackToOwnerButton, {
    owners: owners,
    selectedIndex: selectedIndex,
    selectOwner: selectOwner
  }), selectedOwner != null && /*#__PURE__*/react["createElement"](ElementView, {
    owner: selectedOwner,
    isSelected: true,
    selectOwner: selectOwner
  })), !isOverflowing && owners.map((owner, index) => /*#__PURE__*/react["createElement"](ElementView, {
    key: index,
    owner: owner,
    isSelected: index === selectedIndex,
    selectOwner: selectOwner
  }))), /*#__PURE__*/react["createElement"]("div", {
    className: OwnersStack_default.a.VRule
  }), /*#__PURE__*/react["createElement"](Button_Button, {
    className: OwnersStack_default.a.IconButton,
    onClick: () => selectOwner(null),
    title: "Back to tree view"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "close"
  })));
}