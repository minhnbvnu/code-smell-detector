function useMenuButtonContext() {
  var _useDropdownContext = useDropdownContext(),
      isExpanded = _useDropdownContext.state.isExpanded;

  return Object(react["useMemo"])(function () {
    return {
      isExpanded: isExpanded
    };
  }, [isExpanded]);
}