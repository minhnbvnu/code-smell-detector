function EventTooltip_EventTooltip({
  canvasRef,
  data,
  height,
  hoveredEvent,
  origin,
  width
}) {
  const ref = useSmartTooltip({
    canvasRef,
    mouseX: origin.x,
    mouseY: origin.y
  });

  if (hoveredEvent === null) {
    return null;
  }

  const {
    componentMeasure,
    flamechartStackFrame,
    measure,
    nativeEvent,
    networkMeasure,
    schedulingEvent,
    snapshot,
    suspenseEvent,
    thrownError,
    userTimingMark
  } = hoveredEvent;
  let content = null;

  if (componentMeasure !== null) {
    content = /*#__PURE__*/react["createElement"](TooltipReactComponentMeasure, {
      componentMeasure: componentMeasure
    });
  } else if (nativeEvent !== null) {
    content = /*#__PURE__*/react["createElement"](TooltipNativeEvent, {
      nativeEvent: nativeEvent
    });
  } else if (networkMeasure !== null) {
    content = /*#__PURE__*/react["createElement"](TooltipNetworkMeasure, {
      networkMeasure: networkMeasure
    });
  } else if (schedulingEvent !== null) {
    content = /*#__PURE__*/react["createElement"](TooltipSchedulingEvent, {
      data: data,
      schedulingEvent: schedulingEvent
    });
  } else if (snapshot !== null) {
    content = /*#__PURE__*/react["createElement"](TooltipSnapshot, {
      height: height,
      snapshot: snapshot,
      width: width
    });
  } else if (suspenseEvent !== null) {
    content = /*#__PURE__*/react["createElement"](TooltipSuspenseEvent, {
      suspenseEvent: suspenseEvent
    });
  } else if (measure !== null) {
    content = /*#__PURE__*/react["createElement"](TooltipReactMeasure, {
      data: data,
      measure: measure
    });
  } else if (flamechartStackFrame !== null) {
    content = /*#__PURE__*/react["createElement"](TooltipFlamechartNode, {
      stackFrame: flamechartStackFrame
    });
  } else if (userTimingMark !== null) {
    content = /*#__PURE__*/react["createElement"](TooltipUserTimingMark, {
      mark: userTimingMark
    });
  } else if (thrownError !== null) {
    content = /*#__PURE__*/react["createElement"](TooltipThrownError, {
      thrownError: thrownError
    });
  }

  if (content !== null) {
    return /*#__PURE__*/react["createElement"]("div", {
      className: EventTooltip_default.a.Tooltip,
      ref: ref
    }, content);
  } else {
    return null;
  }
}