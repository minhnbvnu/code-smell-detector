function callValidate() {
    var validate = compilation.validate;
    var result = validate.apply(null, arguments);
    callValidate.errors = validate.errors;
    return result;
  }