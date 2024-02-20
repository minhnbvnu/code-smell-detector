function _execWithToken(method, params={}, callback) {
        params.token = params && params.token || xxx.token
        return exec(method, params, callback)
      }