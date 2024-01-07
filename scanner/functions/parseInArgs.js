function parseInArgs(encoded, context) {
  /** @type {Array<number|string>} */
  let haystack = /** @type {any} */ (encoded[2]);
  if (!Array.isArray(haystack)) {
    throw new Error(
      `The "in" operator was provided a literal value which was not an array as second argument.`,
    );
  }
  if (typeof haystack[0] === 'string') {
    if (haystack[0] !== 'literal') {
      throw new Error(
        `For the "in" operator, a string array should be wrapped in a "literal" operator to disambiguate from expressions.`,
      );
    }
    if (!Array.isArray(haystack[1])) {
      throw new Error(
        `The "in" operator was provided a literal value which was not an array as second argument.`,
      );
    }
    haystack = haystack[1];
  }

  let needleType = StringType | NumberType;
  const args = new Array(haystack.length);
  for (let i = 0; i < args.length; i++) {
    const arg = parse(haystack[i], context);
    needleType &= arg.type;
    args[i] = arg;
  }
  if (isType(needleType, NoneType)) {
    throw new Error(
      `Could not find a common type for the following in operation: ` +
        JSON.stringify(encoded),
    );
  }

  const needle = parse(encoded[1], context, needleType);
  return [needle, ...args];
}