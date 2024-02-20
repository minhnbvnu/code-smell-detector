function memoizeOutput(workerFunc, equalityFunc) {
        var cachedRes = null;
        return function () {
            var newRes = workerFunc.apply(this, arguments);
            if (cachedRes === null || !(cachedRes === newRes || equalityFunc(cachedRes, newRes))) {
                cachedRes = newRes;
            }
            return cachedRes;
        };
    }