function useRect(nodeRef, observeOrOptions, deprecated_onChange) {
  var observe;
  var onChange;

  if (isBoolean(observeOrOptions)) {
    observe = observeOrOptions;
  } else {
    var _observeOrOptions$obs;

    observe = (_observeOrOptions$obs = observeOrOptions == null ? void 0 : observeOrOptions.observe) != null ? _observeOrOptions$obs : true;
    onChange = observeOrOptions == null ? void 0 : observeOrOptions.onChange;
  }

  if (isFunction(deprecated_onChange)) {
    onChange = deprecated_onChange;
  }

  if (false) {}

  var _React$useState = Object(react["useState"])(nodeRef.current),
      element = _React$useState[0],
      setElement = _React$useState[1];

  var initialRectIsSet = Object(react["useRef"])(false);
  var initialRefIsSet = Object(react["useRef"])(false);

  var _React$useState2 = Object(react["useState"])(null),
      rect = _React$useState2[0],
      setRect = _React$useState2[1];

  var onChangeRef = Object(react["useRef"])(onChange); // eslint-disable-next-line react-hooks/exhaustive-deps

  useIsomorphicLayoutEffect(function () {
    onChangeRef.current = onChange;

    if (nodeRef.current !== element) {
      setElement(nodeRef.current);
    }
  });
  useIsomorphicLayoutEffect(function () {
    if (element && !initialRectIsSet.current) {
      initialRectIsSet.current = true;
      setRect(element.getBoundingClientRect());
    }
  }, [element]);
  useIsomorphicLayoutEffect(function () {
    if (!observe) {
      return;
    }

    var elem = element; // State initializes before refs are placed, meaning the element state will
    // be undefined on the first render. We still want the rect on the first
    // render, so initially we'll use the nodeRef that was passed instead of
    // state for our measurements.

    if (!initialRefIsSet.current) {
      initialRefIsSet.current = true;
      elem = nodeRef.current;
    }

    if (!elem) {
      if (false) {}

      return;
    }

    var observer = observe_rect_esm(elem, function (rect) {
      onChangeRef.current == null ? void 0 : onChangeRef.current(rect);
      setRect(rect);
    });
    observer.observe();
    return function () {
      observer.unobserve();
    };
  }, [observe, element, nodeRef]);
  return rect;
}