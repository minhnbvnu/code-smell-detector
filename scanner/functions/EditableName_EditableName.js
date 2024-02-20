function EditableName_EditableName({
  allowEmpty = false,
  allowWhiteSpace = false,
  autoFocus = false,
  className = '',
  initialValue = '',
  overrideName,
  path,
  type
}) {
  const [editableName, setEditableName] = Object(react["useState"])(initialValue);
  const [isValid, setIsValid] = Object(react["useState"])(false);
  const handleChange = Object(react["useCallback"])(({
    target
  }) => {
    let value = target.value;

    if (!allowWhiteSpace) {
      value = value.trim();
    }

    if (allowEmpty || value !== '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setEditableName(value);
  }, [overrideName]);
  const handleKeyDown = Object(react["useCallback"])(event => {
    // Prevent keydown events from e.g. change selected element in the tree
    event.stopPropagation();

    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if (isValid) {
          const basePath = path.slice(0, path.length - 1);
          overrideName([...basePath, initialValue], [...basePath, editableName]);
        }

        break;

      case 'Escape':
        setEditableName(initialValue);
        break;

      default:
        break;
    }
  }, [editableName, setEditableName, isValid, initialValue, overrideName]);
  return /*#__PURE__*/react["createElement"](AutoSizeInput_AutoSizeInput, {
    autoFocus: autoFocus,
    className: [EditableName_default.a.Input, className].join(' '),
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    placeholder: "new entry",
    testName: "EditableName",
    type: "text",
    value: editableName
  });
}