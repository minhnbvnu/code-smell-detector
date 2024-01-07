function createParser(returnType, ...argValidators) {
  return function (encoded, context, typeHint) {
    const operator = encoded[0];
    let parsedArgs = [];
    for (let i = 0; i < argValidators.length; i++) {
      parsedArgs =
        argValidators[i](encoded, context, parsedArgs, typeHint) || parsedArgs;
    }
    let actualType =
      typeof returnType === 'function' ? returnType(parsedArgs) : returnType;
    if (typeHint !== undefined) {
      if (!overlapsType(actualType, typeHint)) {
        throw new Error(
          `The following expression was expected to return ${typeName(
            typeHint,
          )}, but returns ${typeName(actualType)} instead: ${JSON.stringify(
            encoded,
          )}`,
        );
      }
      actualType &= typeHint;
    }
    if (actualType === NoneType) {
      throw new Error(
        `No matching type was found for the following expression: ${JSON.stringify(
          encoded,
        )}`,
      );
    }
    return new CallExpression(actualType, operator, ...parsedArgs);
  };
}