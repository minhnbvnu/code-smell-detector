function buildComputedValidationMessages(property, validations = [], customValidations = []) {
  let validationParams = validations.map((v) => get(v, 'param')).filter((v) => !isBlank(v));
  let customValidationParams = customValidations.map((v) => get(v, 'param')).filter((v) => !isBlank(v));

  return computed(property, 'errors.[]', 'customValidations.[]', ...validationParams, ...customValidationParams, function() {
    let validations = A();
    let messages = A();

    // built-in validations
    validations.pushObjects(this.validations());

    // custom validations
    let customValidations = this.customValidations;
    assert('`customValidations` must be an array', isArray(customValidations));
    validations.pushObjects(customValidations);

    // execute validations
    let currentValue = this.get(property);
    validations.forEach((validation) => {
      assert('validation must include a `validate(value)` function', validation && validation.validate && typeof validation.validate === 'function');
      try {
        let valParam = get(validation, 'param');
        let paramValue = valParam ? this.get(valParam) : undefined;
        if (!validation.validate(currentValue, paramValue)) {
          let message = this.get(`errorMessages.${valParam}`) || get(validation, 'message');
          messages.pushObject({
            message: loc(message.string || message, paramValue, currentValue)
          });
        }
      } catch(error) {
        warn(`Exception with validation: ${validation} ${error}`, false);
      }
    });

    // error messages array
    let errors = this.errors || [];
    assert('`errors` must be an array', isArray(errors));
    messages.pushObjects(errors.map((e) => {
      return get(e, 'message') ? e : { message: e };
    }));

    return messages;
  });
}