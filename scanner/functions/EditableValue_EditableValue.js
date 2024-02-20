function EditableValue_EditableValue({
  className = '',
  overrideValue,
  path,
  value
}) {
  const [state, dispatch] = useEditableValue(value);
  const {
    editableValue,
    hasPendingChanges,
    isValid,
    parsedValue
  } = state;

  const reset = () => dispatch({
    type: 'RESET',
    externalValue: value
  }); // $FlowFixMe[missing-local-annot]


  const handleChange = ({
    target
  }) => dispatch({
    type: 'UPDATE',
    editableValue: target.value,
    externalValue: value
  }); // $FlowFixMe[missing-local-annot]


  const handleCheckBoxToggle = ({
    target
  }) => {
    dispatch({
      type: 'UPDATE',
      editableValue: target.checked,
      externalValue: value
    }); // Unlike <input type="text"> which has both an onChange and an onBlur,
    // <input type="checkbox"> updates state *and* applies changes in a single event.
    // So we read from target.checked rather than parsedValue (which has not yet updated).
    // We also don't check isValid (because that hasn't changed yet either);
    // we don't need to check it anyway, since target.checked is always a boolean.

    overrideValue(path, target.checked);
  }; // $FlowFixMe[missing-local-annot]


  const handleKeyDown = event => {
    // Prevent keydown events from e.g. change selected element in the tree
    event.stopPropagation();

    switch (event.key) {
      case 'Enter':
        applyChanges();
        break;

      case 'Escape':
        reset();
        break;

      default:
        break;
    }
  };

  const applyChanges = () => {
    if (isValid && hasPendingChanges) {
      overrideValue(path, parsedValue);
    }
  };

  let placeholder = '';

  if (editableValue === undefined) {
    placeholder = '(undefined)';
  } else {
    placeholder = 'Enter valid JSON';
  }

  const isBool = parsedValue === true || parsedValue === false;
  return /*#__PURE__*/react["createElement"](react["Fragment"], null, /*#__PURE__*/react["createElement"]("input", {
    autoComplete: "new-password",
    className: `${isValid ? EditableValue_default.a.Input : EditableValue_default.a.Invalid} ${className}`,
    "data-testname": "EditableValue",
    onBlur: applyChanges,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    placeholder: placeholder,
    type: "text",
    value: editableValue
  }), isBool && /*#__PURE__*/react["createElement"]("input", {
    className: EditableValue_default.a.Checkbox,
    checked: parsedValue,
    type: "checkbox",
    onChange: handleCheckBoxToggle
  }));
}