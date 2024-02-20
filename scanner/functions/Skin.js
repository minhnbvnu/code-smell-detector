function Skin() {
  const cssRules = useTypedSelector(getCssRules);
  const clipPaths = useTypedSelector(getClipPaths);

  if (cssRules == null) {
    return null;
  }

  return /*#__PURE__*/Object(jsx_runtime["jsxs"])(jsx_runtime["Fragment"], {
    children: [/*#__PURE__*/Object(jsx_runtime["jsx"])(Css, {
      id: "webamp-skin",
      children: cssRules
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])(ClipPaths, {
      children: clipPaths
    })]
  });
}