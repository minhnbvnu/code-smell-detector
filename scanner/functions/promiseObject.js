function promiseObject(promise, label) {
  return PromiseObject.create({
    promise: Promise.resolve(promise, label)
  });
}