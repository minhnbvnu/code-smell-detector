function errorFactory(error) {
  const message = [
    "\n",
    ...getFileExcerptIfPossible(error),
    error.message.charAt(0).toUpperCase() + error.message.slice(1),
    error.filename
      ? `      Error in ${path.normalize(error.filename)} (line ${
          error.line
        }, column ${error.column})`
      : "",
  ].join("\n");

  const obj = new Error(message, { cause: error });

  obj.stack = null;

  return obj;
}