function requestBlob(url, withCredentials) {
      return requestUrlAsBlob(url, {}, withCredentials).then(function (result) {
        return result.status < 200 || result.status >= 300 ? handleHttpError(result.status) : global$3.resolve(result.blob);
      });
    }