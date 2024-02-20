function useDropdownItem(_ref4) {
  var indexProp = _ref4.index,
      _ref4$isLink = _ref4.isLink,
      isLink = _ref4$isLink === void 0 ? false : _ref4$isLink,
      onClick = _ref4.onClick,
      onDragStart = _ref4.onDragStart,
      onMouseDown = _ref4.onMouseDown,
      onMouseEnter = _ref4.onMouseEnter,
      onMouseLeave = _ref4.onMouseLeave,
      onMouseMove = _ref4.onMouseMove,
      onMouseUp = _ref4.onMouseUp,
      onSelect = _ref4.onSelect,
      disabled = _ref4.disabled,
      onFocus = _ref4.onFocus,
      valueTextProp = _ref4.valueText,
      forwardedRef = _ref4.ref,
      props = reach_dropdown_esm_objectWithoutPropertiesLoose(_ref4, reach_dropdown_esm_excluded3);

  var _useDropdownContext2 = useDropdownContext(),
      dispatch = _useDropdownContext2.dispatch,
      dropdownRef = _useDropdownContext2.dropdownRef,
      mouseDownStartPosRef = _useDropdownContext2.mouseDownStartPosRef,
      readyToSelect = _useDropdownContext2.readyToSelect,
      selectCallbacks = _useDropdownContext2.selectCallbacks,
      triggerRef = _useDropdownContext2.triggerRef,
      _useDropdownContext2$ = _useDropdownContext2.state,
      selectionIndex = _useDropdownContext2$.selectionIndex,
      isExpanded = _useDropdownContext2$.isExpanded;

  var ownRef = Object(react["useRef"])(null); // After the ref is mounted to the DOM node, we check to see if we have an
  // explicit valueText prop before looking for the node's textContent for
  // typeahead functionality.

  var _React$useState = Object(react["useState"])(valueTextProp || ""),
      valueText = _React$useState[0],
      setValueText = _React$useState[1];

  var setValueTextFromDOM = Object(react["useCallback"])(function (node) {
    if (!valueTextProp && node != null && node.textContent) {
      setValueText(node.textContent);
    }
  }, [valueTextProp]);
  var mouseEventStarted = Object(react["useRef"])(false);

  var _useStatefulRefValue = useStatefulRefValue(ownRef, null),
      element = _useStatefulRefValue[0],
      handleRefSet = _useStatefulRefValue[1];

  var descendant = Object(react["useMemo"])(function () {
    return {
      element: element,
      key: valueText,
      disabled: disabled,
      isLink: isLink
    };
  }, [disabled, element, isLink, valueText]);
  var index = useDescendant(descendant, DropdownDescendantContext, indexProp);
  var isSelected = index === selectionIndex && !disabled;
  var ref = useComposedRefs(forwardedRef, handleRefSet, setValueTextFromDOM); // Update the callback ref array on every render

  selectCallbacks.current[index] = onSelect;

  function select() {
    reach_dropdown_esm_focus(triggerRef.current);
    onSelect && onSelect();
    dispatch({
      type: CLICK_MENU_ITEM
    });
  }

  function handleClick(event) {
    if (isRightClick(event.nativeEvent)) {
      return;
    }

    if (isLink) {
      if (disabled) {
        event.preventDefault();
      } else {
        select();
      }
    }
  }

  function handleDragStart(event) {
    // Because we don't preventDefault on mousedown for links (we need the
    // native click event), clicking and holding on a link triggers a
    // dragstart which we don't want.
    if (isLink) {
      event.preventDefault();
    }
  }

  function handleMouseDown(event) {
    if (isRightClick(event.nativeEvent)) {
      return;
    }

    if (isLink) {
      // Signal that the mouse is down so we can call the right function if the
      // user is clicking on a link.
      mouseEventStarted.current = true;
    } else {
      event.preventDefault();
    }
  }

  function handleMouseEnter(event) {
    var doc = getOwnerDocument(dropdownRef.current);

    if (!isSelected && index != null && !disabled) {
      if (dropdownRef != null && dropdownRef.current && dropdownRef.current !== doc.activeElement && ownRef.current !== doc.activeElement) {
        dropdownRef.current.focus();
      }

      dispatch({
        type: SELECT_ITEM_AT_INDEX,
        payload: {
          index: index
        }
      });
    }
  }

  function handleMouseLeave(event) {
    // Clear out selection when mouse over a non-dropdown-item child.
    dispatch({
      type: CLEAR_SELECTION_INDEX
    });
  }

  function handleMouseMove(event) {
    if (!readyToSelect.current) {
      var threshold = 8;
      var deltaX = Math.abs(event.clientX - mouseDownStartPosRef.current.x);
      var deltaY = Math.abs(event.clientY - mouseDownStartPosRef.current.y);

      if (deltaX > threshold || deltaY > threshold) {
        readyToSelect.current = true;
      }
    }

    if (!isSelected && index != null && !disabled) {
      dispatch({
        type: SELECT_ITEM_AT_INDEX,
        payload: {
          index: index,
          dropdownRef: dropdownRef
        }
      });
    }
  }

  function handleFocus() {
    readyToSelect.current = true;

    if (!isSelected && index != null && !disabled) {
      dispatch({
        type: SELECT_ITEM_AT_INDEX,
        payload: {
          index: index
        }
      });
    }
  }

  function handleMouseUp(event) {
    if (isRightClick(event.nativeEvent)) {
      return;
    }

    if (!readyToSelect.current) {
      readyToSelect.current = true;
      return;
    }

    if (isLink) {
      // If a mousedown event was initiated on a link item followed by a mouseup
      // event on the same link, we do nothing; a click event will come next and
      // handle selection. Otherwise, we trigger a click event.
      if (mouseEventStarted.current) {
        mouseEventStarted.current = false;
      } else if (ownRef.current) {
        ownRef.current.click();
      }
    } else {
      if (!disabled) {
        select();
      }
    }
  }

  Object(react["useEffect"])(function () {
    if (isExpanded) {
      // When the dropdown opens, wait for about half a second before enabling
      // selection. This is designed to mirror dropdown menus on macOS, where
      // opening a menu on top of a trigger would otherwise result in an
      // immediate accidental selection once the click trigger is released.
      var id = window.setTimeout(function () {
        readyToSelect.current = true;
      }, 400);
      return function () {
        window.clearTimeout(id);
      };
    } else {
      // When the dropdown closes, reset readyToSelect for the next interaction.
      readyToSelect.current = false;
    }
  }, [isExpanded, readyToSelect]); // Any time a mouseup event occurs anywhere in the document, we reset the
  // mouseEventStarted ref so we can check it again when needed.

  Object(react["useEffect"])(function () {
    var ownerDocument = getOwnerDocument(ownRef.current);
    ownerDocument.addEventListener("mouseup", listener);
    return function () {
      ownerDocument.removeEventListener("mouseup", listener);
    };

    function listener() {
      mouseEventStarted.current = false;
    }
  }, []);
  return {
    data: {
      disabled: disabled
    },
    props: reach_dropdown_esm_extends({
      id: useItemId(index),
      tabIndex: -1
    }, props, {
      ref: ref,
      "data-disabled": disabled ? "" : undefined,
      "data-selected": isSelected ? "" : undefined,
      "data-valuetext": valueText,
      onClick: composeEventHandlers(onClick, handleClick),
      onDragStart: composeEventHandlers(onDragStart, handleDragStart),
      onMouseDown: composeEventHandlers(onMouseDown, handleMouseDown),
      onMouseEnter: composeEventHandlers(onMouseEnter, handleMouseEnter),
      onMouseLeave: composeEventHandlers(onMouseLeave, handleMouseLeave),
      onMouseMove: composeEventHandlers(onMouseMove, handleMouseMove),
      onFocus: composeEventHandlers(onFocus, handleFocus),
      onMouseUp: composeEventHandlers(onMouseUp, handleMouseUp)
    })
  };
}