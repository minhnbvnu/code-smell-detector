function ExpandCollapseToggle_ExpandCollapseToggle({
  disabled,
  isOpen,
  setIsOpen
}) {
  return /*#__PURE__*/react["createElement"](Button_Button, {
    className: ExpandCollapseToggle_default.a.ExpandCollapseToggle,
    disabled: disabled,
    onClick: () => setIsOpen(prevIsOpen => !prevIsOpen),
    title: `${isOpen ? 'Collapse' : 'Expand'} prop value`
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: isOpen ? 'expanded' : 'collapsed'
  }));
}