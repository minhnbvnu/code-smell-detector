function RecordToggle_RecordToggle({
  disabled
}) {
  const {
    isProfiling,
    startProfiling,
    stopProfiling
  } = Object(react["useContext"])(ProfilerContext);
  let className = RecordToggle_default.a.InactiveRecordToggle;

  if (disabled) {
    className = RecordToggle_default.a.DisabledRecordToggle;
  } else if (isProfiling) {
    className = RecordToggle_default.a.ActiveRecordToggle;
  }

  return /*#__PURE__*/react["createElement"](Button_Button, {
    className: className,
    disabled: disabled,
    onClick: isProfiling ? stopProfiling : startProfiling,
    testName: "ProfilerToggleButton",
    title: isProfiling ? 'Stop profiling' : 'Start profiling'
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "record"
  }));
}