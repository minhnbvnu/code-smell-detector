function validateModel(model = {}) {
  /** start beta/v1 condition **/
  let betaErrors = v.validate(model, "/ModelBeta").errors;
  if (betaErrors.length) {
    /** end/v1 condition **/
    let errors = v.validate(model, "/Modelv1").errors;
    if (errors.length) {
      throw new e.ElectroError(
        e.ErrorCodes.InvalidModel,
        errors
          .map((err) => {
            let message = `${err.property}`;
            switch (err.argument) {
              case "isFunction":
                return `${message} must be a function`;
              case "isFunctionOrString":
                return `${message} must be either a function or string`;
              case "isFunctionOrRegexp":
                return `${message} must be either a function or Regexp`;
              default:
                return `${message} ${err.message}`;
            }
          })
          .join(", "),
      );
    }
  }
}