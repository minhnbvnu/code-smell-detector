function computeMatch(props, ctx) {
  var computedMatch = props.computedMatch,
      path = props.path,
      strict = props.strict,
      exact = props.exact,
      sensitive = props.sensitive;
  if (computedMatch) return computedMatch; // maybe already computed the match for us

  var pathname = __WEBPACK_IMPORTED_MODULE_6__navigator__["a" /* default */].history.location.pathname;
  return Object(__WEBPACK_IMPORTED_MODULE_7__utils__["d" /* matchPath */])(pathname, {
    path: path,
    strict: strict,
    exact: exact,
    sensitive: sensitive
  }, ctx.match);
}