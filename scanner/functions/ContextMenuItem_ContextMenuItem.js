function ContextMenuItem_ContextMenuItem({
  children,
  onClick,
  title
}) {
  const {
    hideMenu
  } = Object(react["useContext"])(RegistryContext);

  const handleClick = event => {
    onClick();
    hideMenu();
  };

  return /*#__PURE__*/react["createElement"]("div", {
    className: ContextMenuItem_default.a.ContextMenuItem,
    onClick: handleClick,
    onTouchEnd: handleClick
  }, children);
}