function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }