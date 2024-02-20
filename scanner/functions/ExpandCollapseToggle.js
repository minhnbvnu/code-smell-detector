function ExpandCollapseToggle({
  element,
  store
}) {
  const {
    children,
    id,
    isCollapsed
  } = element; // $FlowFixMe[missing-local-annot]

  const toggleCollapsed = event => {
    event.preventDefault();
    event.stopPropagation();
    store.toggleIsCollapsed(id, !isCollapsed);
  }; // $FlowFixMe[missing-local-annot]


  const stopPropagation = event => {
    // Prevent the row from selecting
    event.stopPropagation();
  };

  if (children.length === 0) {
    return /*#__PURE__*/react["createElement"]("div", {
      className: Element_default.a.ExpandCollapseToggle
    });
  }

  return /*#__PURE__*/react["createElement"]("div", {
    className: Element_default.a.ExpandCollapseToggle,
    onMouseDown: stopPropagation,
    onClick: toggleCollapsed,
    onDoubleClick: swallowDoubleClick
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: isCollapsed ? 'collapsed' : 'expanded'
  }));
}