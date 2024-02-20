function SortContextMenu() {
  const reverseList = useActionCreator(playlist_reverseList);
  const randomizeList = useActionCreator(playlist_randomizeList);
  const sortListByTitle = useActionCreator(playlist_sortListByTitle);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(components_ContextMenuTarget, {
    style: {
      width: "100%",
      height: "100%"
    },
    top: true,
    renderMenu: () => /*#__PURE__*/Object(jsx_runtime["jsxs"])(jsx_runtime["Fragment"], {
      children: [/*#__PURE__*/Object(jsx_runtime["jsx"])(Node, {
        label: "Sort list by title",
        onClick: sortListByTitle
      }), /*#__PURE__*/Object(jsx_runtime["jsx"])(ContextMenu_Hr, {}), /*#__PURE__*/Object(jsx_runtime["jsx"])(Node, {
        label: "Reverse list",
        onClick: reverseList
      }), /*#__PURE__*/Object(jsx_runtime["jsx"])(Node, {
        label: "Randomize list",
        onClick: randomizeList
      })]
    }),
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {})
  });
}