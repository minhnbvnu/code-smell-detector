function NativeStyleEditor(_) {
  const {
    getStyleAndLayout
  } = Object(react["useContext"])(NativeStyleContext);
  const {
    inspectedElementID
  } = Object(react["useContext"])(TreeStateContext);

  if (inspectedElementID === null) {
    return null;
  }

  const maybeStyleAndLayout = getStyleAndLayout(inspectedElementID);

  if (maybeStyleAndLayout === null) {
    return null;
  }

  const {
    layout,
    style
  } = maybeStyleAndLayout;
  return /*#__PURE__*/react["createElement"](react["Fragment"], null, layout !== null && /*#__PURE__*/react["createElement"](LayoutViewer_LayoutViewer, {
    id: inspectedElementID,
    layout: layout
  }), style !== null && /*#__PURE__*/react["createElement"](StyleEditor_StyleEditor, {
    id: inspectedElementID,
    style: style !== null ? style : {}
  }));
}