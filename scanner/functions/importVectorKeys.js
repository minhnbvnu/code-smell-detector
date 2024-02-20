function importVectorKeys(vector, keyUsages) {
      if (vector.key !== null) {
        return new Promise(function (resolve, reject) {
          resolve(vector);
        });
      } else {
        return subtle.importKey("raw", vector.keyBuffer, { name: "HMAC", hash: vector.hash }, false, keyUsages)
          .then(function (key) {
            vector.key = key;
            return vector;
          });
      }
    }