function locationIs(loc1, loc2) {
  if (loc1 === loc2) {
    return true;
  }

  if (!loc1 || !loc2 || loc1.pathname + loc1.search !== loc2.pathname + loc2.search) {
    return false;
  }

  return Object(__WEBPACK_IMPORTED_MODULE_3__core_utils__["a" /* shallowEqual */])(loc1.state, loc2.state);
}