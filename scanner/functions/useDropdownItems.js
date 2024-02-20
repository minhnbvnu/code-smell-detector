function useDropdownItems(_ref6) {
  _ref6.id;

  var onKeyDown = _ref6.onKeyDown,
      forwardedRef = _ref6.ref,
      props = reach_dropdown_esm_objectWithoutPropertiesLoose(_ref6, _excluded5);

  var _useDropdownContext3 = useDropdownContext(),
      dispatch = _useDropdownContext3.dispatch,
      triggerRef = _useDropdownContext3.triggerRef,
      dropdownRef = _useDropdownContext3.dropdownRef,
      selectCallbacks = _useDropdownContext3.selectCallbacks,
      dropdownId = _useDropdownContext3.dropdownId,
      _useDropdownContext3$ = _useDropdownContext3.state,
      isExpanded = _useDropdownContext3$.isExpanded,
      triggerId = _useDropdownContext3$.triggerId,
      selectionIndex = _useDropdownContext3$.selectionIndex,
      typeaheadQuery = _useDropdownContext3$.typeaheadQuery;

  var items = useDropdownDescendants();
  var ref = useComposedRefs(dropdownRef, forwardedRef);
  Object(react["useEffect"])(function () {
    // Respond to user char key input with typeahead
    var match = findItemFromTypeahead(items, typeaheadQuery);

    if (typeaheadQuery && match != null) {
      dispatch({
        type: SELECT_ITEM_AT_INDEX,
        payload: {
          index: match,
          dropdownRef: dropdownRef
        }
      });
    }

    var timeout = window.setTimeout(function () {
      return typeaheadQuery && dispatch({
        type: SEARCH_FOR_ITEM,
        payload: ""
      });
    }, 1000);
    return function () {
      return window.clearTimeout(timeout);
    };
  }, [dispatch, items, typeaheadQuery, dropdownRef]);
  var prevItemsLength = usePrevious(items.length);
  var prevSelected = usePrevious(items[selectionIndex]);
  var prevSelectionIndex = usePrevious(selectionIndex);
  Object(react["useEffect"])(function () {
    if (selectionIndex > items.length - 1) {
      // If for some reason our selection index is larger than our possible
      // index range (let's say the last item is selected and the list
      // dynamically updates), we need to select the last item in the list.
      dispatch({
        type: SELECT_ITEM_AT_INDEX,
        payload: {
          index: items.length - 1,
          dropdownRef: dropdownRef
        }
      });
    } else if ( // Checks if
    //  - item length has changed
    //  - selection index has not changed BUT selected item has changed
    //
    // This prevents any dynamic adding/removing of items from actually
    // changing a user's expected selection.
    prevItemsLength !== items.length && selectionIndex > -1 && prevSelected && prevSelectionIndex === selectionIndex && items[selectionIndex] !== prevSelected) {
      dispatch({
        type: SELECT_ITEM_AT_INDEX,
        payload: {
          index: items.findIndex(function (i) {
            return i.key === (prevSelected == null ? void 0 : prevSelected.key);
          }),
          dropdownRef: dropdownRef
        }
      });
    }
  }, [dropdownRef, dispatch, items, prevItemsLength, prevSelected, prevSelectionIndex, selectionIndex]);
  var handleKeyDown = composeEventHandlers(function handleKeyDown(event) {
    var key = event.key;

    if (!isExpanded) {
      return;
    }

    switch (key) {
      case "Enter":
      case " ":
        var selected = items.find(function (item) {
          return item.index === selectionIndex;
        }); // For links, the Enter key will trigger a click by default, but for
        // consistent behavior across items we'll trigger a click when the
        // spacebar is pressed.

        if (selected && !selected.disabled) {
          event.preventDefault();

          if (selected.isLink && selected.element) {
            selected.element.click();
          } else {
            // Focus the button first by default when an item is selected.
            // We fire the onSelect callback next so the app can manage
            // focus if needed.
            reach_dropdown_esm_focus(triggerRef.current);
            selectCallbacks.current[selected.index] && selectCallbacks.current[selected.index]();
            dispatch({
              type: CLICK_MENU_ITEM
            });
          }
        }

        break;

      case "Escape":
        reach_dropdown_esm_focus(triggerRef.current);
        dispatch({
          type: CLOSE_MENU
        });
        break;

      case "Tab":
        // prevent leaving
        event.preventDefault();
        break;

      default:
        // Check if a user is typing some char keys and respond by setting
        // the query state.
        if (isString(key) && key.length === 1) {
          var query = typeaheadQuery + key.toLowerCase();
          dispatch({
            type: SEARCH_FOR_ITEM,
            payload: query
          });
        }

        break;
    }
  }, useDescendantKeyDown(DropdownDescendantContext, {
    currentIndex: selectionIndex,
    orientation: "vertical",
    rotate: false,
    filter: function filter(item) {
      return !item.disabled;
    },
    callback: function callback(index) {
      dispatch({
        type: SELECT_ITEM_AT_INDEX,
        payload: {
          index: index,
          dropdownRef: dropdownRef
        }
      });
    },
    key: "index"
  }));
  return {
    data: {
      activeDescendant: useItemId(selectionIndex) || undefined,
      triggerId: triggerId
    },
    props: reach_dropdown_esm_extends({
      tabIndex: -1
    }, props, {
      ref: ref,
      id: dropdownId,
      onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown)
    })
  };
}