function parseMatchArgs(encoded, context, parsedArgs, typeHint) {
  const argsCount = encoded.length - 1;

  const input = parse(encoded[1], context);
  let inputType = input.type;
  const fallback = parse(encoded[encoded.length - 1], context);
  let outputType =
    typeHint !== undefined ? typeHint & fallback.type : fallback.type;

  // first parse args to figure out possible types
  const args = new Array(argsCount - 2);
  for (let i = 0; i < argsCount - 2; i += 2) {
    const match = parse(encoded[i + 2], context);
    const output = parse(encoded[i + 3], context);
    inputType &= match.type;
    outputType &= output.type;
    args[i] = match;
    args[i + 1] = output;
  }

  // check input and output types validity
  const expectedInputType = StringType | NumberType | BooleanType;
  if (!overlapsType(expectedInputType, inputType)) {
    throw new Error(
      `Expected an input of type ${typeName(
        expectedInputType,
      )} for the interpolate operation` +
        `, got ${typeName(inputType)} instead`,
    );
  }
  if (isType(outputType, NoneType)) {
    throw new Error(
      `Could not find a common output type for the following match operation: ` +
        JSON.stringify(encoded),
    );
  }

  // parse again inputs and outputs with common type
  for (let i = 0; i < argsCount - 2; i += 2) {
    const match = parse(encoded[i + 2], context, inputType);
    const output = parse(encoded[i + 3], context, outputType);
    args[i] = match;
    args[i + 1] = output;
  }

  return [
    parse(encoded[1], context, inputType),
    ...args,
    parse(encoded[encoded.length - 1], context, outputType),
  ];
}