function Button_Button({
  children,
  className = '',
  testName,
  title,
  ...rest
}) {
  let button =
  /*#__PURE__*/
  // $FlowFixMe unsafe spread
  react["createElement"]("button", Button_extends({
    className: `${Button_default.a.Button} ${className}`,
    "data-testname": testName
  }, rest), /*#__PURE__*/react["createElement"]("span", {
    className: `${Button_default.a.ButtonContent} ${className}`,
    tabIndex: -1
  }, children));

  if (title) {
    button = /*#__PURE__*/react["createElement"](reach_ui_tooltip, {
      label: title
    }, button);
  }

  return button;
}