function useEditableValueReducer(state, action) {
  switch (action.type) {
    case 'RESET':
      return { ...state,
        editableValue: smartStringify(action.externalValue),
        externalValue: action.externalValue,
        hasPendingChanges: false,
        isValid: true,
        parsedValue: action.externalValue
      };

    case 'UPDATE':
      let isNewValueValid = false;
      let newParsedValue;

      try {
        newParsedValue = smartParse(action.editableValue);
        isNewValueValid = true;
      } catch (error) {}

      return { ...state,
        editableValue: sanitizeForParse(action.editableValue),
        externalValue: action.externalValue,
        hasPendingChanges: smartStringify(action.externalValue) !== action.editableValue,
        isValid: isNewValueValid,
        parsedValue: isNewValueValid ? newParsedValue : state.parsedValue
      };

    default:
      throw new Error(`Invalid action "${action.type}"`);
  }
}