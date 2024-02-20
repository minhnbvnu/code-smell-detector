function BackToOwnerButton({
  owners,
  selectedIndex,
  selectOwner
}) {
  const store = Object(react["useContext"])(StoreContext);

  if (selectedIndex <= 0) {
    return null;
  }

  const owner = owners[selectedIndex - 1];
  const isInStore = store.containsElement(owner.id);
  return /*#__PURE__*/react["createElement"](Button_Button, {
    className: isInStore ? undefined : OwnersStack_default.a.NotInStore,
    onClick: () => isInStore ? selectOwner(owner) : null,
    title: `Up to ${owner.displayName || 'owner'}`
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "previous"
  }));
}