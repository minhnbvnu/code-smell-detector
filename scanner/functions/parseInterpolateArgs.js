function parseInterpolateArgs(encoded, context, parsedArgs, typeHint) {
  const interpolationType = encoded[1];
  let interpolation;
  switch (interpolationType[0]) {
    case 'linear':
      interpolation = 1;
      break;
    case 'exponential':
      interpolation = interpolationType[1];
      if (typeof interpolation !== 'number') {
        throw new Error(
          `Expected a number base for exponential interpolation` +
            `, got ${JSON.stringify(interpolation)} instead`,
        );
      }
      break;
    default:
      interpolation = null;
  }
  if (!interpolation) {
    throw new Error(
      `Invalid interpolation type: ${JSON.stringify(interpolationType)}`,
    );
  }
  interpolation = parse(interpolation, context);

  // check input types
  let input = parse(encoded[2], context);
  if (!overlapsType(NumberType, input.type)) {
    throw new Error(
      `Expected an input of type number for the interpolate operation` +
        `, got ${typeName(input.type)} instead`,
    );
  }
  input = parse(encoded[2], context, NumberType); // parse again with narrower output

  const args = new Array(encoded.length - 3);
  for (let i = 0; i < args.length; i += 2) {
    let stop = parse(encoded[i + 3], context);
    if (!overlapsType(NumberType, stop.type)) {
      throw new Error(
        `Expected all stop input values in the interpolate operation to be of type number` +
          `, got ${typeName(stop.type)} at position ${i + 2} instead`,
      );
    }
    let output = parse(encoded[i + 4], context);
    if (!overlapsType(NumberType | ColorType, output.type)) {
      throw new Error(
        `Expected all stop output values in the interpolate operation to be a number or color` +
          `, got ${typeName(output.type)} at position ${i + 3} instead`,
      );
    }
    // parse again with narrower types
    stop = parse(encoded[i + 3], context, NumberType);
    output = parse(encoded[i + 4], context, NumberType | ColorType);
    args[i] = stop;
    args[i + 1] = output;
  }

  return [interpolation, input, ...args];
}