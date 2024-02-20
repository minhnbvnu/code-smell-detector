function useStatefulRefValue(ref, initialState) {
  var _useState = Object(react["useState"])(initialState),
      state = _useState[0],
      setState = _useState[1];

  var callbackRef = Object(react["useCallback"])(function (refValue) {
    ref.current = refValue;
    setState(refValue); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [state, callbackRef];
}