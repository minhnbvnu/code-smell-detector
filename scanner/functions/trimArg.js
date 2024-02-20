function trimArg(predicateFn) {
      return function (arg1, arg2) {
        return predicateFn(arg2);
      };
    }