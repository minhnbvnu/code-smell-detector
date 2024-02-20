function patchConstant(ebConstant) {
    Object.defineProperty(ebConstant, 'module', {
      enumerable: false,
      get() {
        return function (moduleName) {
          return ebConstants[moduleName];
        };
      },
    });
  }