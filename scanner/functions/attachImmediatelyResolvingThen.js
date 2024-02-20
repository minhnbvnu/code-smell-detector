function attachImmediatelyResolvingThen(promise, val) {
    promise.then = function (onResolve) {
        if (typeof onResolve === 'function') {
            return PromiseStub.resolve(onResolve(val));
        }
        return promise;
    };
}