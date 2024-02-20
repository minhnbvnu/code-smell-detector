function ToggleIcon({
  isEnabled,
  isValid
}) {
  let className;

  if (isValid) {
    className = isEnabled ? SettingsShared_default.a.ToggleOn : SettingsShared_default.a.ToggleOff;
  } else {
    className = isEnabled ? SettingsShared_default.a.ToggleOnInvalid : SettingsShared_default.a.ToggleOffInvalid;
  }

  return /*#__PURE__*/react["createElement"]("div", {
    className: className
  }, /*#__PURE__*/react["createElement"]("div", {
    className: isEnabled ? SettingsShared_default.a.ToggleInsideOn : SettingsShared_default.a.ToggleInsideOff
  }));
}