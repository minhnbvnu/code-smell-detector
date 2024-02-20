function useEditableValue(externalValue) {
  const [state, dispatch] = Object(react["useReducer"])(useEditableValueReducer, {
    editableValue: smartStringify(externalValue),
    externalValue,
    hasPendingChanges: false,
    isValid: true,
    parsedValue: externalValue
  });

  if (!Object.is(state.externalValue, externalValue)) {
    if (!state.hasPendingChanges) {
      dispatch({
        type: 'RESET',
        externalValue
      });
    } else {
      dispatch({
        type: 'UPDATE',
        editableValue: state.editableValue,
        externalValue
      });
    }
  }

  return [state, dispatch];
}