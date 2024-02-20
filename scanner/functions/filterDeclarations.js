function filterDeclarations(selectedRule) {
    return function (allowedDeclarationsList, attributeObject) {
      // If this property is allowlisted...
      if (has(selectedRule, attributeObject.prop)) {
        var matchesRegex = selectedRule[attributeObject.prop].some(function (regularExpression) {
          return regularExpression.test(attributeObject.value);
        });
        if (matchesRegex) {
          allowedDeclarationsList.push(attributeObject);
        }
      }
      return allowedDeclarationsList;
    };
  }