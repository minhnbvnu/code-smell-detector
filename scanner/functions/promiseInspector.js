function promiseInspector() {
  let fulfilled, rejected;
  const promise = new Promise((resolve, reject) => {
    fulfilled = resolve;
    rejected = reject;
  });
  promise.fulfilled = fulfilled;
  promise.rejected = rejected;
  return promise;
}