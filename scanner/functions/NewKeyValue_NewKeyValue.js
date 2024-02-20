function NewKeyValue_NewKeyValue({
  bridge,
  depth,
  hidden,
  hookID,
  inspectedElement,
  path,
  store,
  type
}) {
  const [newPropKey, setNewPropKey] = Object(react["useState"])(0);
  const [newPropName, setNewPropName] = Object(react["useState"])(''); // $FlowFixMe[missing-local-annot]

  const overrideNewEntryName = (oldPath, newPath) => {
    setNewPropName(newPath[newPath.length - 1]);
  };

  const overrideNewEntryValue = (newPath, value) => {
    if (!newPropName) {
      return;
    }

    setNewPropName('');
    setNewPropKey(newPropKey + 1);
    const {
      id
    } = inspectedElement;
    const rendererID = store.getRendererIDForElement(id);

    if (rendererID !== null) {
      let basePath = newPath;

      if (hookID != null) {
        basePath = parseHookPathForEdit(basePath);
      }

      bridge.send('overrideValueAtPath', {
        type,
        hookID,
        id,
        path: basePath,
        rendererID,
        value
      });
    }
  };

  return /*#__PURE__*/react["createElement"]("div", {
    key: newPropKey,
    hidden: hidden,
    style: {
      paddingLeft: `${(depth - 1) * 0.75}rem`
    }
  }, /*#__PURE__*/react["createElement"]("div", {
    className: NewKeyValue_default.a.NewKeyValue
  }, /*#__PURE__*/react["createElement"](EditableName_EditableName, {
    autoFocus: newPropKey > 0,
    className: NewKeyValue_default.a.EditableName,
    overrideName: overrideNewEntryName,
    path: []
  }), ":\xA0", /*#__PURE__*/react["createElement"](EditableValue_EditableValue, {
    className: NewKeyValue_default.a.EditableValue,
    overrideValue: overrideNewEntryValue,
    path: [...path, newPropName],
    value: ''
  })));
}