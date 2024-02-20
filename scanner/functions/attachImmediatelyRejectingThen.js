function attachImmediatelyRejectingThen(promise) {
    promise.then = function (onResolve, onReject) {
        if (typeof onReject === 'function') {
            onReject();
        }
        return promise;
    };
}