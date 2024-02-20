function ElementView({
  isSelected,
  owner,
  selectOwner
}) {
  const store = Object(react["useContext"])(StoreContext);
  const {
    displayName,
    hocDisplayNames,
    type
  } = owner;
  const isInStore = store.containsElement(owner.id);
  const handleChange = Object(react["useCallback"])(() => {
    if (isInStore) {
      selectOwner(owner);
    }
  }, [isInStore, selectOwner, owner]);
  return /*#__PURE__*/react["createElement"](Toggle_Toggle, {
    className: `${OwnersStack_default.a.Component} ${isInStore ? '' : OwnersStack_default.a.NotInStore}`,
    isChecked: isSelected,
    onChange: handleChange
  }, displayName, /*#__PURE__*/react["createElement"](Badge_Badge, {
    className: OwnersStack_default.a.Badge,
    hocDisplayNames: hocDisplayNames,
    type: type
  }));
}