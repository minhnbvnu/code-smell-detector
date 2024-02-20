function useItemId(index) {
  var _React$useContext = Object(react["useContext"])(DropdownContext),
      dropdownId = _React$useContext.dropdownId;

  return index != null && index > -1 ? makeId("option-" + index, dropdownId) : undefined;
}