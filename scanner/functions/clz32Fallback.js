function clz32Fallback(x) {
              var asUint = x >>> 0;
              if (asUint === 0) {
                return 32;
              }
              return 31 - (log(asUint) / LN2 | 0) | 0;
            }