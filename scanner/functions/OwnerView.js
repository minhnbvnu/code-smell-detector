function OwnerView({
  displayName,
  hocDisplayNames,
  id,
  isInStore,
  type
}) {
  const dispatch = Object(react["useContext"])(TreeDispatcherContext);
  const {
    highlightNativeElement,
    clearHighlightNativeElement
  } = useHighlightNativeElement();
  const handleClick = Object(react["useCallback"])(() => {
    Object(Logger["a" /* logEvent */])({
      event_name: 'select-element',
      metadata: {
        source: 'owner-view'
      }
    });
    dispatch({
      type: 'SELECT_ELEMENT_BY_ID',
      payload: id
    });
  }, [dispatch, id]);

  const onMouseEnter = () => highlightNativeElement(id);

  const onMouseLeave = clearHighlightNativeElement;
  return /*#__PURE__*/react["createElement"](Button_Button, {
    key: id,
    className: InspectedElementView_default.a.OwnerButton,
    disabled: !isInStore,
    onClick: handleClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, /*#__PURE__*/react["createElement"]("span", {
    className: InspectedElementView_default.a.OwnerContent
  }, /*#__PURE__*/react["createElement"]("span", {
    className: `${InspectedElementView_default.a.Owner} ${isInStore ? '' : InspectedElementView_default.a.NotInStore}`,
    title: displayName
  }, displayName), /*#__PURE__*/react["createElement"](Badge_Badge, {
    hocDisplayNames: hocDisplayNames,
    type: type
  })));
}