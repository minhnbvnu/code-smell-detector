function isAllowedPromiseTermination(expression) {
      // somePromise.then(a, b)
      if (
        allowThen &&
        expression.type === 'CallExpression' &&
        expression.callee.type === 'MemberExpression' &&
        expression.callee.property.name === 'then' &&
        expression.arguments.length === 2
      ) {
        return true
      }

      // somePromise.catch().finally(fn)
      if (
        allowFinally &&
        expression.type === 'CallExpression' &&
        expression.callee.type === 'MemberExpression' &&
        expression.callee.property.name === 'finally' &&
        isPromise(expression.callee.object) &&
        isAllowedPromiseTermination(expression.callee.object)
      ) {
        return true
      }

      // somePromise.catch()
      if (
        expression.type === 'CallExpression' &&
        expression.callee.type === 'MemberExpression' &&
        terminationMethod.indexOf(expression.callee.property.name) !== -1
      ) {
        return true
      }

      // somePromise['catch']()
      if (
        expression.type === 'CallExpression' &&
        expression.callee.type === 'MemberExpression' &&
        expression.callee.property.type === 'Literal' &&
        expression.callee.property.value === 'catch'
      ) {
        return true
      }

      return false
    }