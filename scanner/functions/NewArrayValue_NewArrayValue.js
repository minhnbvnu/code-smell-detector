function NewArrayValue_NewArrayValue({
  bridge,
  depth,
  hidden,
  hookID,
  index,
  inspectedElement,
  path,
  store,
  type
}) {
  const [key, setKey] = Object(react["useState"])(0);
  const [isInvalid, setIsInvalid] = Object(react["useState"])(false); // This is a bit of an unusual usage of the EditableName component,
  // but otherwise it acts the way we want for a new Array entry.
  // $FlowFixMe[missing-local-annot]

  const overrideName = (oldPath, newPath) => {
    const value = newPath[newPath.length - 1];
    let parsedValue;
    let newIsInvalid = true;

    try {
      parsedValue = smartParse(value);
      newIsInvalid = false;
    } catch (error) {}

    if (isInvalid !== newIsInvalid) {
      setIsInvalid(newIsInvalid);
    }

    if (!newIsInvalid) {
      setKey(key + 1);
      const {
        id
      } = inspectedElement;
      const rendererID = store.getRendererIDForElement(id);

      if (rendererID !== null) {
        let basePath = path;

        if (hookID != null) {
          basePath = parseHookPathForEdit(basePath);
        }

        bridge.send('overrideValueAtPath', {
          type,
          hookID,
          id,
          path: [...basePath, index],
          rendererID,
          value: parsedValue
        });
      }
    }
  };

  return /*#__PURE__*/react["createElement"]("div", {
    key: key,
    hidden: hidden,
    style: {
      paddingLeft: `${(depth - 1) * 0.75}rem`
    }
  }, /*#__PURE__*/react["createElement"]("div", {
    className: NewArrayValue_default.a.NewArrayValue
  }, /*#__PURE__*/react["createElement"](EditableName_EditableName, {
    allowWhiteSpace: true,
    autoFocus: key > 0,
    className: [NewArrayValue_default.a.EditableName, isInvalid && NewArrayValue_default.a.Invalid].join(' '),
    initialValue: "",
    overrideName: overrideName,
    path: path
  })));
}