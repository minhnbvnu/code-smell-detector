function withTheme$1(Component) {
  var componentName = Component.displayName || Component.name || 'Component';

  var render = function render(props, ref) {
    var theme = Object(react__WEBPACK_IMPORTED_MODULE_37__["useContext"])(ThemeContext);
    return /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_37__["createElement"])(Component, _extends$1({
      theme: theme,
      ref: ref
    }, props));
  }; // $FlowFixMe


  var WithTheme = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_37__["forwardRef"])(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return hoistNonReactStatics$1(WithTheme, Component);
}