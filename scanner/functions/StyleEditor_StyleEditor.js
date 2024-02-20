function StyleEditor_StyleEditor({
  id,
  style
}) {
  const bridge = Object(react["useContext"])(BridgeContext);
  const store = Object(react["useContext"])(StoreContext);

  const changeAttribute = (oldName, newName, value) => {
    const rendererID = store.getRendererIDForElement(id);

    if (rendererID !== null) {
      bridge.send('NativeStyleEditor_renameAttribute', {
        id,
        rendererID,
        oldName,
        newName,
        value
      });
    }
  };

  const changeValue = (name, value) => {
    const rendererID = store.getRendererIDForElement(id);

    if (rendererID !== null) {
      bridge.send('NativeStyleEditor_setValue', {
        id,
        rendererID,
        name,
        value
      });
    }
  };

  const keys = Object(react["useMemo"])(() => Array.from(Object.keys(style)), [style]);

  const handleCopy = () => Object(clipboard["copy"])(serializeDataForCopy(style));

  return /*#__PURE__*/react["createElement"]("div", {
    className: StyleEditor_default.a.StyleEditor
  }, /*#__PURE__*/react["createElement"]("div", {
    className: StyleEditor_default.a.HeaderRow
  }, /*#__PURE__*/react["createElement"]("div", {
    className: StyleEditor_default.a.Header
  }, /*#__PURE__*/react["createElement"]("div", {
    className: StyleEditor_default.a.Brackets
  }, 'style {')), /*#__PURE__*/react["createElement"](Button_Button, {
    onClick: handleCopy,
    title: "Copy to clipboard"
  }, /*#__PURE__*/react["createElement"](ButtonIcon_ButtonIcon, {
    type: "copy"
  }))), keys.length > 0 && keys.map(attribute => /*#__PURE__*/react["createElement"](Row, {
    key: attribute,
    attribute: attribute,
    changeAttribute: changeAttribute,
    changeValue: changeValue,
    validAttributes: store.nativeStyleEditorValidAttributes,
    value: style[attribute]
  })), /*#__PURE__*/react["createElement"](NewRow, {
    changeAttribute: changeAttribute,
    changeValue: changeValue,
    validAttributes: store.nativeStyleEditorValidAttributes
  }), /*#__PURE__*/react["createElement"]("div", {
    className: StyleEditor_default.a.Brackets
  }, '}'));
}