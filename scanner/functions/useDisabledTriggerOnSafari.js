function useDisabledTriggerOnSafari(_ref5) {
  var disabled = _ref5.disabled,
      isVisible = _ref5.isVisible,
      ref = _ref5.ref;
  Object(react["useEffect"])(function () {
    if (!(typeof window !== "undefined" && "PointerEvent" in window) || !disabled || !isVisible) {
      return;
    }

    var ownerDocument = getOwnerDocument(ref.current);

    function handleMouseMove(event) {
      if (!isVisible) {
        return;
      }

      if (event.target instanceof Element && event.target.closest("[data-reach-tooltip-trigger][data-state='tooltip-visible']")) {
        return;
      }

      send({
        type: TooltipEvents.GlobalMouseMove
      });
    }

    ownerDocument.addEventListener("mousemove", handleMouseMove);
    return function () {
      ownerDocument.removeEventListener("mousemove", handleMouseMove);
    };
  }, [disabled, isVisible, ref]);
}