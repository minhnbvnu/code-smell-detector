function parseCaseArgs(encoded, context, parsedArgs, typeHint) {
  const fallback = parse(encoded[encoded.length - 1], context);
  let outputType =
    typeHint !== undefined ? typeHint & fallback.type : fallback.type;

  // first parse args to figure out possible types
  const args = new Array(encoded.length - 1);
  for (let i = 0; i < args.length - 1; i += 2) {
    const condition = parse(encoded[i + 1], context);
    const output = parse(encoded[i + 2], context);
    if (!overlapsType(BooleanType, condition.type)) {
      throw new Error(
        `Expected all conditions in the case operation to be of type boolean` +
          `, got ${typeName(condition.type)} at position ${i} instead`,
      );
    }
    outputType &= output.type;
    args[i] = condition;
    args[i + 1] = output;
  }

  if (isType(outputType, NoneType)) {
    throw new Error(
      `Could not find a common output type for the following case operation: ` +
        JSON.stringify(encoded),
    );
  }

  // parse again args with common output type
  for (let i = 0; i < args.length - 1; i += 2) {
    args[i + 1] = parse(encoded[i + 2], context, outputType);
  }
  args[args.length - 1] = parse(
    encoded[encoded.length - 1],
    context,
    outputType,
  );

  return args;
}