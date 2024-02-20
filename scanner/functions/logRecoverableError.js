function logRecoverableError(request, error2) {
              var errorDigest = request.onError(error2);
              if (errorDigest != null && typeof errorDigest !== "string") {
                throw new Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof errorDigest + '" instead');
              }
              return errorDigest;
            }