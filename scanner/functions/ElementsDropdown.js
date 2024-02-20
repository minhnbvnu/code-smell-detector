function ElementsDropdown({
  owners,
  selectedIndex,
  selectOwner
}) {
  const store = Object(react["useContext"])(StoreContext);
  const menuItems = [];

  for (let index = owners.length - 1; index >= 0; index--) {
    const owner = owners[index];
    const isInStore = store.containsElement(owner.id);
    menuItems.push( /*#__PURE__*/react["createElement"](MenuItem, {
      key: owner.id,
      className: `${OwnersStack_default.a.Component} ${isInStore ? '' : OwnersStack_default.a.NotInStore}`,
      onSelect: () => isInStore ? selectOwner(owner) : null
    }, owner.displayName, /*#__PURE__*/react["createElement"](Badge_Badge, {
      className: OwnersStack_default.a.Badge,
      hocDisplayNames: owner.hocDisplayNames,
      type: owner.type
    })));
  }

  return /*#__PURE__*/react["createElement"](Menu, null, /*#__PURE__*/react["createElement"](MenuButton, {
    className: OwnersStack_default.a.MenuButton
  }, /*#__PURE__*/react["createElement"](reach_ui_tooltip, {
    label: "Open elements dropdown"
  }, /*#__PURE__*/react["createElement"]("span", {
    className: OwnersStack_default.a.MenuButtonContent,
    tabIndex: -1
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "more"
  })))), /*#__PURE__*/react["createElement"](menu_button_MenuList, {
    className: OwnersStack_default.a.Modal
  }, menuItems));
}