function ClipPaths({
  children
}) {
  const paths = Object(react["useMemo"])(() => {
    return document.createElement("div");
  }, []);
  Object(react["useLayoutEffect"])(() => {
    document.body.appendChild(paths);
    return () => paths.remove();
  }, [paths]);
  return Object(react_dom["createPortal"])( /*#__PURE__*/Object(jsx_runtime["jsx"])("svg", {
    height: 0,
    width: 0,
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])("defs", {
      children: Object.keys(children).map(id => /*#__PURE__*/Object(jsx_runtime["jsx"])("clipPath", {
        id: id,
        children: children[id].map((points, i) => /*#__PURE__*/Object(jsx_runtime["jsx"])("polygon", {
          points: points
        }, i))
      }, id))
    })
  }), paths);
}