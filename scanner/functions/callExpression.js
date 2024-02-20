function callExpression(exprFn, key, value) {
          locals[valueName] = value;
          if (keyName) locals[keyName] = key;
          return exprFn(scope, locals);
        }