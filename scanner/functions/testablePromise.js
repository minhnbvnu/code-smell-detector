function testablePromise(promise) {
  if (!promise || !promise.then) throw new Error('Expected a promise, but got ' + jasmine.pp(promise) + '.');
  if (!angular.isDefined(promise.$$resolved)) throw new Error('Promise has not been augmented by ngMock');
  return promise;
}