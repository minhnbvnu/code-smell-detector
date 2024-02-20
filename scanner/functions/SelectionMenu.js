function SelectionMenu() {
  const invert = useActionCreator(invertSelection);
  const zero = useActionCreator(playlist_selectZero);
  const all = useActionCreator(selectAll);
  return /*#__PURE__*/Object(jsx_runtime["jsxs"])(PlaylistWindow_PlaylistMenu, {
    id: "playlist-selection-menu",
    children: [/*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      className: "invert-selection",
      onClick: invert
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      className: "select-zero",
      onClick: zero
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      className: "select-all",
      onClick: all
    })]
  });
}