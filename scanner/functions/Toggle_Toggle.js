function Toggle_Toggle({
  children,
  className = '',
  isDisabled = false,
  isChecked,
  onChange,
  testName,
  title
}) {
  let defaultClassName;

  if (isDisabled) {
    defaultClassName = Toggle_default.a.ToggleDisabled;
  } else if (isChecked) {
    defaultClassName = Toggle_default.a.ToggleOn;
  } else {
    defaultClassName = Toggle_default.a.ToggleOff;
  }

  const handleClick = Object(react["useCallback"])(() => onChange(!isChecked), [isChecked, onChange]);
  let toggle = /*#__PURE__*/react["createElement"]("button", {
    className: `${defaultClassName} ${className}`,
    "data-testname": testName,
    disabled: isDisabled,
    onClick: handleClick
  }, /*#__PURE__*/react["createElement"]("span", {
    className: Toggle_default.a.ToggleContent,
    tabIndex: -1
  }, children));

  if (title) {
    toggle = /*#__PURE__*/react["createElement"](reach_ui_tooltip, {
      label: title
    }, toggle);
  }

  return toggle;
}