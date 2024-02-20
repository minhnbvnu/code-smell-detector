function InspectHostNodesToggle() {
  const [isInspecting, setIsInspecting] = Object(react["useState"])(false);
  const bridge = Object(react["useContext"])(BridgeContext);
  const handleChange = Object(react["useCallback"])(isChecked => {
    setIsInspecting(isChecked);

    if (isChecked) {
      Object(Logger["a" /* logEvent */])({
        event_name: 'inspect-element-button-clicked'
      });
      bridge.send('startInspectingNative');
    } else {
      bridge.send('stopInspectingNative', false);
    }
  }, [bridge]);
  Object(react["useEffect"])(() => {
    const onStopInspectingNative = () => setIsInspecting(false);

    bridge.addListener('stopInspectingNative', onStopInspectingNative);
    return () => bridge.removeListener('stopInspectingNative', onStopInspectingNative);
  }, [bridge]);
  return /*#__PURE__*/react["createElement"](Toggle_Toggle, {
    onChange: handleChange,
    isChecked: isInspecting,
    title: "Select an element in the page to inspect it"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "search"
  }));
}