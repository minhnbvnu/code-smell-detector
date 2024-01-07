function narrowArgsType(encoded, context, parsedArgs) {
  const operation = encoded[0];
  const argCount = encoded.length - 1;

  // first pass to determine a narrowed down type
  let sameType = AnyType;
  for (let i = 0; i < parsedArgs.length; ++i) {
    sameType &= parsedArgs[i].type;
  }

  if (sameType === NoneType) {
    throw new Error(
      `No common type could be found for arguments of ${operation} operation`,
    );
  }

  // re-parse args
  const args = new Array(argCount);
  for (let i = 0; i < argCount; ++i) {
    args[i] = parse(encoded[i + 1], context, sameType);
  }
  return args;
}