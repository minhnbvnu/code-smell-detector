function nbind(obj, context) {
  return BB.promisify(obj, { context });
}