function wrapSharedExpression(exp) {
      var wrapped = exp;

      if (exp.sharedGetter) {
        wrapped = function $parseWrapper(self, locals) {
          return exp(self, locals);
        };
        wrapped.literal = exp.literal;
        wrapped.constant = exp.constant;
        wrapped.assign = exp.assign;
      }

      return wrapped;
    }