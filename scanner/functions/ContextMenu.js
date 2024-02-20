function ContextMenu({
  children,
  offsetTop,
  offsetLeft,
  top,
  bottom,
  selected
}) {
  const zIndex = useTypedSelector(getZIndex);

  if (!selected) {
    return null;
  }

  return /*#__PURE__*/Object(jsx_runtime["jsx"])(Portal, {
    top: offsetTop,
    left: offsetLeft,
    zIndex: zIndex,
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])("ul", {
      className: classnames_default()("context-menu", {
        top,
        bottom
      }),
      children: children
    })
  });
}