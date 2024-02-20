function getRandomDevice() {
          if (typeof crypto == "object" && typeof crypto["getRandomValues"] == "function") {
            var randomBuffer = new Uint8Array(1);
            return () => {
              crypto.getRandomValues(randomBuffer);
              return randomBuffer[0];
            };
          } else if (ENVIRONMENT_IS_NODE) {
            try {
              var crypto_module = require_crypto();
              return () => crypto_module["randomBytes"](1)[0];
            } catch (e) {
            }
          }
          return () => abort("randomDevice");
        }