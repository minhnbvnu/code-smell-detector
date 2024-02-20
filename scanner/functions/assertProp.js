function assertProp(prop, value, vm) {
    if (!prop.options.required && ( // non-required
    prop.raw === null || // abscent
    value == null) // null or undefined
    ) {
        return true;
      }
    var options = prop.options;
    var type = options.type;
    var valid = !type;
    var expectedTypes = [];
    if (type) {
      if (!isArray(type)) {
        type = [type];
      }
      for (var i = 0; i < type.length && !valid; i++) {
        var assertedType = assertType(value, type[i]);
        expectedTypes.push(assertedType.expectedType);
        valid = assertedType.valid;
      }
    }
    if (!valid) {
      if ('development' !== 'production') {
        warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
      }
      return false;
    }
    var validator = options.validator;
    if (validator) {
      if (!validator(value)) {
        'development' !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
        return false;
      }
    }
    return true;
  }