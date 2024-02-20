function reach_popover_esm_getStyles(position, targetRect, popoverRect) {
  for (var _len = arguments.length, unstable_observableRefs = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    unstable_observableRefs[_key - 3] = arguments[_key];
  }

  return popoverRect ? position.apply(void 0, [targetRect, popoverRect].concat(unstable_observableRefs.map(function (ref) {
    return ref.current;
  }))) : {
    visibility: "hidden"
  };
}