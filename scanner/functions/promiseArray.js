function promiseArray(promise, label) {
  return PromiseArray.create({
    promise: Promise.resolve(promise, label)
  });
}