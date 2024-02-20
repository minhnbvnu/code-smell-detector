function resolvedValue(promise) {
  var result = resolvedPromise(promise);
  if (!result.success) throw result.error;
  return result.value;
}