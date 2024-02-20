function* iterateDefinedReferences(scope) {
      for (const variable of scope.variables) {
        for (const reference of variable.references) {
          yield reference
        }
      }
    }