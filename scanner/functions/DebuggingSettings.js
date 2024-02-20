function DebuggingSettings(_) {
  const {
    appendComponentStack,
    breakOnConsoleErrors,
    hideConsoleLogsInStrictMode,
    setAppendComponentStack,
    setBreakOnConsoleErrors,
    setShowInlineWarningsAndErrors,
    showInlineWarningsAndErrors,
    setHideConsoleLogsInStrictMode
  } = Object(react["useContext"])(SettingsContext);
  return /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Settings
  }, /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Setting
  }, /*#__PURE__*/react["createElement"]("label", null, /*#__PURE__*/react["createElement"]("input", {
    type: "checkbox",
    checked: appendComponentStack,
    onChange: ({
      currentTarget
    }) => setAppendComponentStack(currentTarget.checked)
  }), ' ', "Append component stacks to console warnings and errors.")), /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Setting
  }, /*#__PURE__*/react["createElement"]("label", null, /*#__PURE__*/react["createElement"]("input", {
    type: "checkbox",
    checked: showInlineWarningsAndErrors,
    onChange: ({
      currentTarget
    }) => setShowInlineWarningsAndErrors(currentTarget.checked)
  }), ' ', "Show inline warnings and errors.")), /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Setting
  }, /*#__PURE__*/react["createElement"]("label", null, /*#__PURE__*/react["createElement"]("input", {
    type: "checkbox",
    checked: breakOnConsoleErrors,
    onChange: ({
      currentTarget
    }) => setBreakOnConsoleErrors(currentTarget.checked)
  }), ' ', "Break on warnings")), /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Setting
  }, /*#__PURE__*/react["createElement"]("label", null, /*#__PURE__*/react["createElement"]("input", {
    type: "checkbox",
    checked: hideConsoleLogsInStrictMode,
    onChange: ({
      currentTarget
    }) => setHideConsoleLogsInStrictMode(currentTarget.checked)
  }), ' ', "Hide logs during second render in Strict Mode")));
}