function TimelineSearchContextController({
  children,
  profilerData,
  viewState
}) {
  const [state, dispatch] = Object(react["useReducer"])(TimelineSearchContext_reducer, {
    profilerData,
    searchIndex: -1,
    searchRegExp: null,
    searchResults: EMPTY_ARRAY,
    searchText: ''
  });
  const value = Object(react["useMemo"])(() => ({ ...state,
    dispatch
  }), [state]);
  return /*#__PURE__*/react["createElement"](TimelineSearchContext.Provider, {
    value: value
  }, children);
}