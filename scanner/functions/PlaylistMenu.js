function PlaylistMenu(props) {
  const [selected, setSelected] = Object(react["useState"])(false);
  const [ref, setRef] = Object(react["useState"])(null);
  const callback = Object(react["useCallback"])(() => {
    // If we've clicked on a Context Menu spawed inside this menu, it will
    // register as an external click. However, hiding the menu will remove
    // the Context Menu from the DOM. Therefore, we wait until the next
    // event loop to actually hide ourselves.
    setTimeout(() => {
      // Close the menu
      setSelected(false);
    }, 0);
  }, []);
  useOnClickAway(ref, selected ? callback : null);
  return /*#__PURE__*/Object(jsx_runtime["jsxs"])("div", {
    id: props.id,
    className: classnames_default()("playlist-menu", {
      selected
    }),
    ref: setRef,
    onClick: () => setSelected(selected_ => !selected_),
    children: [/*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      className: "bar"
    }), selected && /*#__PURE__*/Object(jsx_runtime["jsx"])("ul", {
      children: react["Children"].map(props.children, (child, i) => /*#__PURE__*/Object(jsx_runtime["jsx"])(PlaylistWindow_PlaylistMenuEntry, {
        children: child
      }, i))
    })]
  });
}