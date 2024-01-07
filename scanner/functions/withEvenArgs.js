function withEvenArgs(encoded, context) {
  const operation = encoded[0];
  const argCount = encoded.length - 1;
  if (argCount % 2 === 1) {
    throw new Error(
      `An even amount of arguments was expected for operation ${operation}, got ${JSON.stringify(
        argCount,
      )} instead`,
    );
  }
}