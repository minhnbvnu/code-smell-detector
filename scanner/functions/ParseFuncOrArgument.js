function ParseFuncOrArgument(result, isFunction, allowedInText, numArgs, numOptionalArgs, argTypes) {
    this.result = result;
    // Is this a function (i.e. is it something defined in functions.js)?
    this.isFunction = isFunction;
    // Is it allowed in text mode?
    this.allowedInText = allowedInText;
    // How many arguments?
    this.numArgs = numArgs;
    // How many optional arguments?
    this.numOptionalArgs = numOptionalArgs;
    // What types of arguments?
    this.argTypes = argTypes;
}