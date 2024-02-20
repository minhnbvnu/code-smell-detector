function GeneralSettings(_) {
  const {
    displayDensity,
    setDisplayDensity,
    setTheme,
    setTraceUpdatesEnabled,
    theme,
    traceUpdatesEnabled
  } = Object(react["useContext"])(SettingsContext);
  const {
    backendVersion,
    supportsTraceUpdates
  } = Object(react["useContext"])(StoreContext);
  const frontendVersion = "4.27.1-f7d56173f";
  const showBackendVersion = backendVersion && backendVersion !== frontendVersion;
  return /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Settings
  }, /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Setting
  }, /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.RadioLabel
  }, "Theme"), /*#__PURE__*/react["createElement"]("select", {
    className: SettingsShared_default.a.Select,
    value: theme,
    onChange: ({
      currentTarget
    }) => setTheme(currentTarget.value)
  }, /*#__PURE__*/react["createElement"]("option", {
    value: "auto"
  }, "Auto"), /*#__PURE__*/react["createElement"]("option", {
    value: "light"
  }, "Light"), /*#__PURE__*/react["createElement"]("option", {
    value: "dark"
  }, "Dark"))), /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Setting
  }, /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.RadioLabel
  }, "Display density"), /*#__PURE__*/react["createElement"]("select", {
    className: SettingsShared_default.a.Select,
    value: displayDensity,
    onChange: ({
      currentTarget
    }) => setDisplayDensity(currentTarget.value)
  }, /*#__PURE__*/react["createElement"]("option", {
    value: "compact"
  }, "Compact"), /*#__PURE__*/react["createElement"]("option", {
    value: "comfortable"
  }, "Comfortable"))), supportsTraceUpdates && /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.Setting
  }, /*#__PURE__*/react["createElement"]("label", null, /*#__PURE__*/react["createElement"]("input", {
    type: "checkbox",
    checked: traceUpdatesEnabled,
    onChange: ({
      currentTarget
    }) => setTraceUpdatesEnabled(currentTarget.checked)
  }), ' ', "Highlight updates when components render.")), /*#__PURE__*/react["createElement"]("div", {
    className: SettingsShared_default.a.ReleaseNotes
  }, showBackendVersion && /*#__PURE__*/react["createElement"]("div", null, /*#__PURE__*/react["createElement"]("ul", {
    className: SettingsShared_default.a.VersionsList
  }, /*#__PURE__*/react["createElement"]("li", null, /*#__PURE__*/react["createElement"](Version, {
    label: "DevTools backend version:",
    version: backendVersion
  })), /*#__PURE__*/react["createElement"]("li", null, /*#__PURE__*/react["createElement"](Version, {
    label: "DevTools frontend version:",
    version: frontendVersion
  })))), !showBackendVersion && /*#__PURE__*/react["createElement"](Version, {
    label: "DevTools version:",
    version: frontendVersion
  })));
}