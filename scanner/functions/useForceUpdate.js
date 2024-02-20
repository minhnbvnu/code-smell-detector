function useForceUpdate() {
  var _useState = Object(react["useState"])(Object.create(null)),
      dispatch = _useState[1];

  return Object(react["useCallback"])(function () {
    dispatch(Object.create(null));
  }, []);
}