function useComposedRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  return Object(react["useCallback"])(function (node) {
    for (var _iterator = _createForOfIteratorHelperLoose(refs), _step; !(_step = _iterator()).done;) {
      var ref = _step.value;
      assignRef(ref, node);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, refs);
}