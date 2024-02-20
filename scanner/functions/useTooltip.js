function useTooltip(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      idProp = _ref.id,
      onPointerEnter = _ref.onPointerEnter,
      onPointerMove = _ref.onPointerMove,
      onPointerLeave = _ref.onPointerLeave,
      onPointerDown = _ref.onPointerDown,
      onMouseEnter = _ref.onMouseEnter,
      onMouseMove = _ref.onMouseMove,
      onMouseLeave = _ref.onMouseLeave,
      onMouseDown = _ref.onMouseDown,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      onKeyDown = _ref.onKeyDown,
      disabled = _ref.disabled,
      forwardedRef = _ref.ref,
      DEBUG_STYLE = _ref.DEBUG_STYLE;

  var id = String(useId(idProp));

  var _React$useState = Object(react["useState"])(DEBUG_STYLE ? true : isTooltipVisible(id, true)),
      isVisible = _React$useState[0],
      setIsVisible = _React$useState[1]; // hopefully they always pass a ref if they ever pass one


  var ownRef = Object(react["useRef"])(null);
  var ref = useComposedRefs(forwardedRef, ownRef);
  var triggerRect = useRect(ownRef, {
    observe: isVisible
  });
  Object(react["useEffect"])(function () {
    return reach_tooltip_esm_subscribe(function () {
      setIsVisible(isTooltipVisible(id));
    });
  }, [id]);
  useCheckStyles("tooltip");
  Object(react["useEffect"])(function () {
    var ownerDocument = getOwnerDocument(ownRef.current);

    function listener(event) {
      if ((event.key === "Escape" || event.key === "Esc") && reach_tooltip_esm_state.value === TooltipStates.Visible) {
        send({
          type: TooltipEvents.SelectWithKeyboard
        });
      }
    }

    ownerDocument.addEventListener("keydown", listener);
    return function () {
      return ownerDocument.removeEventListener("keydown", listener);
    };
  }, []);
  useDisabledTriggerOnSafari({
    disabled: disabled,
    isVisible: isVisible,
    ref: ownRef
  });

  function wrapMouseEvent(theirHandler, ourHandler) {
    // Use internal MouseEvent handler only if PointerEvent is not supported
    if (typeof window !== "undefined" && "PointerEvent" in window) {
      return theirHandler;
    }

    return composeEventHandlers(theirHandler, ourHandler);
  }

  function wrapPointerEventHandler(handler) {
    return function onPointerEvent(event) {
      // Handle pointer events only from mouse device
      if (event.pointerType !== "mouse") {
        return;
      }

      handler(event);
    };
  }

  function handleMouseEnter() {
    send({
      type: TooltipEvents.MouseEnter,
      id: id
    });
  }

  function handleMouseMove() {
    send({
      type: TooltipEvents.MouseMove,
      id: id
    });
  }

  function handleMouseLeave() {
    send({
      type: TooltipEvents.MouseLeave
    });
  }

  function handleMouseDown() {
    // Allow quick click from one tool to another
    if (reach_tooltip_esm_state.context.id === id) {
      send({
        type: TooltipEvents.MouseDown
      });
    }
  }

  function handleFocus() {
    // @ts-ignore
    if (window.__REACH_DISABLE_TOOLTIPS) {
      return;
    }

    send({
      type: TooltipEvents.Focus,
      id: id
    });
  }

  function handleBlur() {
    // Allow quick click from one tool to another
    if (reach_tooltip_esm_state.context.id === id) {
      send({
        type: TooltipEvents.Blur
      });
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      send({
        type: TooltipEvents.SelectWithKeyboard
      });
    }
  }

  var trigger = {
    // The element that triggers the tooltip references the tooltip element with
    // `aria-describedby`.
    // https://www.w3.org/TR/wai-aria-practices-1.2/#tooltip
    "aria-describedby": isVisible ? makeId("tooltip", id) : undefined,
    "data-state": isVisible ? "tooltip-visible" : "tooltip-hidden",
    "data-reach-tooltip-trigger": "",
    ref: ref,
    onPointerEnter: composeEventHandlers(onPointerEnter, wrapPointerEventHandler(handleMouseEnter)),
    onPointerMove: composeEventHandlers(onPointerMove, wrapPointerEventHandler(handleMouseMove)),
    onPointerLeave: composeEventHandlers(onPointerLeave, wrapPointerEventHandler(handleMouseLeave)),
    onPointerDown: composeEventHandlers(onPointerDown, wrapPointerEventHandler(handleMouseDown)),
    onMouseEnter: wrapMouseEvent(onMouseEnter, handleMouseEnter),
    onMouseMove: wrapMouseEvent(onMouseMove, handleMouseMove),
    onMouseLeave: wrapMouseEvent(onMouseLeave, handleMouseLeave),
    onMouseDown: wrapMouseEvent(onMouseDown, handleMouseDown),
    onFocus: composeEventHandlers(onFocus, handleFocus),
    onBlur: composeEventHandlers(onBlur, handleBlur),
    onKeyDown: composeEventHandlers(onKeyDown, handleKeyDown)
  };
  var tooltip = {
    id: id,
    triggerRect: triggerRect,
    isVisible: isVisible
  };
  return [trigger, tooltip, isVisible];
}