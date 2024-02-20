function resolvedPromise(promise) {
  var result = testablePromise(promise).$$resolved;
  if (!result) throw new Error('Promise is not resolved yet');
  return result;
}