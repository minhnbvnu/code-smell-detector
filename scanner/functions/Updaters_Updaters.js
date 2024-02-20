function Updaters_Updaters({
  commitTree,
  updaters
}) {
  const {
    selectFiber
  } = Object(react["useContext"])(ProfilerContext);
  const children = updaters.length > 0 ? updaters.map(serializedElement => {
    const {
      displayName,
      id,
      key,
      type
    } = serializedElement;
    const isVisibleInTree = commitTree.nodes.has(id) && type !== types["m" /* ElementTypeRoot */];

    if (isVisibleInTree) {
      return /*#__PURE__*/react["createElement"]("button", {
        key: id,
        className: Updaters_default.a.Updater,
        onClick: () => selectFiber(id, displayName)
      }, displayName, " ", key ? `key="${key}"` : '');
    } else {
      return /*#__PURE__*/react["createElement"]("div", {
        key: id,
        className: Updaters_default.a.UnmountedUpdater
      }, displayName, " ", key ? `key="${key}"` : '');
    }
  }) : /*#__PURE__*/react["createElement"]("div", {
    key: "none",
    className: Updaters_default.a.NoUpdaters
  }, "(unknown)");
  return /*#__PURE__*/react["createElement"]("div", {
    className: Updaters_default.a.Updaters
  }, children);
}