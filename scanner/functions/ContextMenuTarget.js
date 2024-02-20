function ContextMenuTarget(props) {
  const handleNode = Object(react["useRef"])(null);
  const [selected, setSelected] = Object(react["useState"])(false);
  Object(react["useEffect"])(() => {
    if (!selected) {
      return;
    }

    function handleGlobalClick(e) {
      if (selected && // Typescript does not believe that these click events are always fired on DOM nodes.
      e.target instanceof Element && selected && // Not sure how, but it's possible for this to get called when handleNode is null/undefined.
      // https://sentry.io/share/issue/2066cd79f21e4f279791319f4d2ea35d/
      handleNode.current && !handleNode.current.contains(e.target)) {
        setSelected(false);
      }
    }

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [selected]);
  const offset = Object(react["useMemo"])(() => {
    return selected ? getNodeOffset(handleNode.current) : // Kinda awkward. This is a nonsense return value since we only use
    //this value when we are selected.
    {
      top: 0,
      left: 0
    };
  }, [selected]);

  const {
    renderMenu,
    children,
    top,
    bottom
  } = props,
        passThroughProps = objectWithoutProperties_default()(props, ["renderMenu", "children", "top", "bottom"]);

  return /*#__PURE__*/Object(jsx_runtime["jsxs"])("div", ContextMenuTarget_objectSpread(ContextMenuTarget_objectSpread({}, passThroughProps), {}, {
    children: [/*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      className: "handle",
      style: {
        width: "100%",
        height: "100%"
      },
      ref: handleNode,
      onClick: () => setSelected(!selected),
      children: children
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])(ContextMenu, {
      selected: selected,
      offsetTop: offset.top,
      offsetLeft: offset.left,
      top: top,
      bottom: bottom,
      children: renderMenu()
    })]
  }));
}