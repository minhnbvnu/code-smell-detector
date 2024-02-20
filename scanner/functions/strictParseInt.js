function strictParseInt(string) {
  let result = parseInt(string, 10);

  if (isStrictlyNaN(result)) {
    throw new Error(
      'Could not extract integer from "' + string + '"'
    );
  }

  return result;
}