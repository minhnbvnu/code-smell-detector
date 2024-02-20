function _emitFrom(socket, requestCtx) {

      if (!socket._raw) {
        throw new Error('Failed to emit from socket- raw SIO socket is missing.');
      }

      // Since callback is embedded in requestCtx,
      // retrieve it and delete the key before continuing.
      var cb = requestCtx.cb;
      delete requestCtx.cb;

      // Name of the appropriate socket.io listener on the server
      // ( === the request method or "verb", e.g. 'get', 'post', 'put', etc. )
      var sailsEndpoint = requestCtx.method;

      socket._raw.emit(sailsEndpoint, requestCtx, function serverResponded(responseCtx) {

        // Send back (emulatedHTTPBody, jsonWebSocketResponse)
        if (cb) {
          cb(responseCtx.body, new JWR(responseCtx));
        }
      });
    }