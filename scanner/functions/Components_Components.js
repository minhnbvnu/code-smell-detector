function Components_Components(_) {
  const wrapperElementRef = Object(react["useRef"])(null);
  const resizeElementRef = Object(react["useRef"])(null);
  const [state, dispatch] = Object(react["useReducer"])(resizeReducer, null, initResizeState);
  const {
    horizontalPercentage,
    verticalPercentage
  } = state;
  Object(react["useLayoutEffect"])(() => {
    const resizeElement = resizeElementRef.current;
    setResizeCSSVariable(resizeElement, 'horizontal', horizontalPercentage * 100);
    setResizeCSSVariable(resizeElement, 'vertical', verticalPercentage * 100);
  }, []);
  Object(react["useEffect"])(() => {
    const timeoutID = setTimeout(() => {
      Object(storage["c" /* localStorageSetItem */])(LOCAL_STORAGE_KEY, JSON.stringify({
        horizontalPercentage,
        verticalPercentage
      }));
    }, 500);
    return () => clearTimeout(timeoutID);
  }, [horizontalPercentage, verticalPercentage]);
  const {
    isResizing
  } = state;

  const onResizeStart = () => dispatch({
    type: 'ACTION_SET_IS_RESIZING',
    payload: true
  });

  let onResize;
  let onResizeEnd;

  if (isResizing) {
    onResizeEnd = () => dispatch({
      type: 'ACTION_SET_IS_RESIZING',
      payload: false
    }); // $FlowFixMe[missing-local-annot]


    onResize = event => {
      const resizeElement = resizeElementRef.current;
      const wrapperElement = wrapperElementRef.current;

      if (!isResizing || wrapperElement === null || resizeElement === null) {
        return;
      }

      event.preventDefault();
      const orientation = getOrientation(wrapperElement);
      const {
        height,
        width,
        left,
        top
      } = wrapperElement.getBoundingClientRect();
      const currentMousePosition = orientation === 'horizontal' ? event.clientX - left : event.clientY - top;
      const boundaryMin = MINIMUM_SIZE;
      const boundaryMax = orientation === 'horizontal' ? width - MINIMUM_SIZE : height - MINIMUM_SIZE;
      const isMousePositionInBounds = currentMousePosition > boundaryMin && currentMousePosition < boundaryMax;

      if (isMousePositionInBounds) {
        const resizedElementDimension = orientation === 'horizontal' ? width : height;
        const actionType = orientation === 'horizontal' ? 'ACTION_SET_HORIZONTAL_PERCENTAGE' : 'ACTION_SET_VERTICAL_PERCENTAGE';
        const percentage = currentMousePosition / resizedElementDimension * 100;
        setResizeCSSVariable(resizeElement, orientation, percentage);
        dispatch({
          type: actionType,
          payload: currentMousePosition / resizedElementDimension
        });
      }
    };
  }

  return /*#__PURE__*/react["createElement"](SettingsModalContextController, null, /*#__PURE__*/react["createElement"](OwnersListContextController, null, /*#__PURE__*/react["createElement"]("div", {
    ref: wrapperElementRef,
    className: Components_default.a.Components,
    onMouseMove: onResize,
    onMouseLeave: onResizeEnd,
    onMouseUp: onResizeEnd
  }, /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("div", {
    ref: resizeElementRef,
    className: Components_default.a.TreeWrapper
  }, /*#__PURE__*/react["createElement"](Tree_Tree, null)), /*#__PURE__*/react["createElement"]("div", {
    className: Components_default.a.ResizeBarWrapper
  }, /*#__PURE__*/react["createElement"]("div", {
    onMouseDown: onResizeStart,
    className: Components_default.a.ResizeBar
  })), /*#__PURE__*/react["createElement"]("div", {
    className: Components_default.a.InspectedElementWrapper
  }, /*#__PURE__*/react["createElement"](NativeStyleContextController, null, /*#__PURE__*/react["createElement"](InspectedElementErrorBoundaryWrapper, null, /*#__PURE__*/react["createElement"](react["Suspense"], {
    fallback: /*#__PURE__*/react["createElement"](Components_Loading, null)
  }, /*#__PURE__*/react["createElement"](InspectedElementContextController, null, /*#__PURE__*/react["createElement"](InspectedElementWrapper, null)))))), /*#__PURE__*/react["createElement"](ModalDialog_ModalDialog, null), /*#__PURE__*/react["createElement"](SettingsModal_SettingsModal, null)))));
}