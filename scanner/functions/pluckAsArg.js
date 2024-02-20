function pluckAsArg(options, prop) {
  if (options[prop]) {
    return [
      '-' + prop,
      options[prop]
    ];
  }
  return [];
}