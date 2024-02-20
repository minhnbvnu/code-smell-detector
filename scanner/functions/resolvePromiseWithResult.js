function resolvePromiseWithResult(result) {
        resolvePromise(result.data, result.status, shallowCopy(result.headers()), result.statusText);
      }