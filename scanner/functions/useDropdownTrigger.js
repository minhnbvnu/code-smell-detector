function useDropdownTrigger(_ref2) {
  var onKeyDown = _ref2.onKeyDown,
      onMouseDown = _ref2.onMouseDown,
      id = _ref2.id,
      forwardedRef = _ref2.ref,
      props = reach_dropdown_esm_objectWithoutPropertiesLoose(_ref2, reach_dropdown_esm_excluded);

  var _useDropdownContext = useDropdownContext(),
      dispatch = _useDropdownContext.dispatch,
      dropdownId = _useDropdownContext.dropdownId,
      mouseDownStartPosRef = _useDropdownContext.mouseDownStartPosRef,
      triggerClickedRef = _useDropdownContext.triggerClickedRef,
      triggerRef = _useDropdownContext.triggerRef,
      _useDropdownContext$s = _useDropdownContext.state,
      triggerId = _useDropdownContext$s.triggerId,
      isExpanded = _useDropdownContext$s.isExpanded;

  var ref = useComposedRefs(triggerRef, forwardedRef);
  var items = useDropdownDescendants();
  var firstNonDisabledIndex = Object(react["useMemo"])(function () {
    return items.findIndex(function (item) {
      return !item.disabled;
    });
  }, [items]);
  Object(react["useEffect"])(function () {
    if (id != null && id !== triggerId) {
      dispatch({
        type: SET_BUTTON_ID,
        payload: id
      });
    }
  }, [triggerId, dispatch, id]);

  function handleKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault(); // prevent scroll

        dispatch({
          type: OPEN_MENU_AT_INDEX,
          payload: {
            index: firstNonDisabledIndex
          }
        });
        break;

      case "Enter":
      case " ":
        dispatch({
          type: OPEN_MENU_AT_INDEX,
          payload: {
            index: firstNonDisabledIndex
          }
        });
        break;
    }
  }

  function handleMouseDown(event) {
    if (isRightClick(event.nativeEvent)) {
      return;
    }

    mouseDownStartPosRef.current = {
      x: event.clientX,
      y: event.clientY
    };

    if (!isExpanded) {
      triggerClickedRef.current = true;
    }

    if (isExpanded) {
      dispatch({
        type: CLOSE_MENU
      });
    } else {
      dispatch({
        type: OPEN_MENU_CLEARED
      });
    }
  }

  return {
    data: {
      isExpanded: isExpanded,
      controls: dropdownId
    },
    props: reach_dropdown_esm_extends({}, props, {
      ref: ref,
      id: triggerId || undefined,
      onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown),
      onMouseDown: composeEventHandlers(onMouseDown, handleMouseDown),
      type: "button"
    })
  };
}