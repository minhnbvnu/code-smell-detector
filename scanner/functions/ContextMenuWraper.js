function ContextMenuWraper(_ref) {
  var _openPosition$y, _openPosition$x;

  let {
    children,
    renderContents
  } = _ref,
      passThroughProps = objectWithoutProperties_default()(_ref, ["children", "renderContents"]);

  const [openPosition, setOpenPosition] = Object(react["useState"])(null);
  const closeMenu = Object(react["useCallback"])(() => {
    setOpenPosition(null);
  }, []);
  const handleGlobalClick = Object(react["useCallback"])(e => {
    if (e.button !== 2) {
      closeMenu();
    }
  }, [closeMenu]);
  const handleRightClick = Object(react["useCallback"])(e => {
    const {
      pageX,
      pageY
    } = e; // TODO: We could do an initial render to see if the menu fits here
    // and do a second render if it does not.

    setOpenPosition({
      x: pageX,
      y: pageY
    });
    e.preventDefault();
    e.stopPropagation();
  }, []); // Add click-away listeners when window is open

  Object(react["useEffect"])(() => {
    if (openPosition == null) {
      return;
    }

    document.addEventListener("click", handleGlobalClick);
    document.body.addEventListener("contextmenu", closeMenu);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
      document.body.removeEventListener("contextmenu", closeMenu);
    };
  }, [openPosition, closeMenu, handleGlobalClick]);
  return /*#__PURE__*/Object(jsx_runtime["jsxs"])("div", ContextMenuWrapper_objectSpread(ContextMenuWrapper_objectSpread({
    onContextMenu: handleRightClick,
    style: {
      width: "100%",
      height: "100%"
    }
  }, passThroughProps), {}, {
    children: [/*#__PURE__*/Object(jsx_runtime["jsx"])(ContextMenu, {
      selected: openPosition != null,
      offsetTop: (_openPosition$y = openPosition === null || openPosition === void 0 ? void 0 : openPosition.y) !== null && _openPosition$y !== void 0 ? _openPosition$y : 0,
      offsetLeft: (_openPosition$x = openPosition === null || openPosition === void 0 ? void 0 : openPosition.x) !== null && _openPosition$x !== void 0 ? _openPosition$x : 0,
      children: renderContents()
    }), children]
  }));
}