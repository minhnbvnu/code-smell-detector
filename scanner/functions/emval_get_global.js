function emval_get_global() {
          if (typeof globalThis == "object") {
            return globalThis;
          }
          return function() {
            return Function;
          }()("return this")();
        }