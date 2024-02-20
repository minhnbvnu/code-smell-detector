function ensureSafeAssignContext(obj, fullExpression) {
  if (obj) {
    if (obj === (0).constructor || obj === (false).constructor || obj === ''.constructor ||
        obj === {}.constructor || obj === [].constructor || obj === Function.constructor) {
      throw $parseMinErr('isecaf',
        'Assigning to a constructor is disallowed! Expression: {0}', fullExpression);
    }
  }
}