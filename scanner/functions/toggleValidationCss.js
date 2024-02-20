function toggleValidationCss(validationErrorKey, isValid) {
    validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';

    cachedToggleClass(VALID_CLASS + validationErrorKey, isValid === true);
    cachedToggleClass(INVALID_CLASS + validationErrorKey, isValid === false);
  }