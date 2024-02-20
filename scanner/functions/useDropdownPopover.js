function useDropdownPopover(_ref8) {
  var onBlur = _ref8.onBlur,
      _ref8$portal = _ref8.portal,
      portal = _ref8$portal === void 0 ? true : _ref8$portal,
      position = _ref8.position,
      forwardedRef = _ref8.ref,
      props = reach_dropdown_esm_objectWithoutPropertiesLoose(_ref8, _excluded7);

  var _useDropdownContext4 = useDropdownContext(),
      triggerRef = _useDropdownContext4.triggerRef,
      triggerClickedRef = _useDropdownContext4.triggerClickedRef,
      dispatch = _useDropdownContext4.dispatch,
      dropdownRef = _useDropdownContext4.dropdownRef,
      popoverRef = _useDropdownContext4.popoverRef,
      isExpanded = _useDropdownContext4.state.isExpanded;

  var ref = useComposedRefs(popoverRef, forwardedRef);
  Object(react["useEffect"])(function () {
    if (!isExpanded) {
      return;
    }

    var ownerDocument = getOwnerDocument(popoverRef.current);

    function listener(event) {
      if (triggerClickedRef.current) {
        triggerClickedRef.current = false;
      } else if (!popoverContainsEventTarget(popoverRef.current, event.target)) {
        // We on want to close only if focus rests outside the dropdown
        dispatch({
          type: CLOSE_MENU
        });
      }
    }

    ownerDocument.addEventListener("mousedown", listener); // see https://github.com/reach/reach-ui/pull/700#discussion_r530369265
    // ownerDocument.addEventListener("touchstart", listener);

    return function () {
      ownerDocument.removeEventListener("mousedown", listener); // ownerDocument.removeEventListener("touchstart", listener);
    };
  }, [triggerClickedRef, triggerRef, dispatch, dropdownRef, popoverRef, isExpanded]);
  return {
    data: {
      portal: portal,
      position: position,
      targetRef: triggerRef,
      isExpanded: isExpanded
    },
    props: reach_dropdown_esm_extends({
      ref: ref,
      hidden: !isExpanded,
      onBlur: composeEventHandlers(onBlur, function (event) {
        if (event.currentTarget.contains(event.relatedTarget)) {
          return;
        }

        dispatch({
          type: CLOSE_MENU
        });
      })
    }, props)
  };
}