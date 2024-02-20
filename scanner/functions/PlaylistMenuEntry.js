function PlaylistMenuEntry({
  children
}) {
  const {
    ref,
    hover
  } = useIsHovered();
  return /*#__PURE__*/Object(jsx_runtime["jsx"])("li", {
    ref: ref,
    className: classnames_default()({
      hover
    }),
    children: children
  });
}