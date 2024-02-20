function getTypeAnnotationBindingConstantViolations(binding, path, name) {
  const types = [];
  const functionConstantViolations = [];
  let constantViolations = getConstantViolationsBefore(binding, path, functionConstantViolations);
  const testType = getConditionalAnnotation(binding, path, name);

  if (testType) {
    const testConstantViolations = getConstantViolationsBefore(binding, testType.ifStatement);
    constantViolations = constantViolations.filter(path => testConstantViolations.indexOf(path) < 0);
    types.push(testType.typeAnnotation);
  }

  if (constantViolations.length) {
    constantViolations = constantViolations.concat(functionConstantViolations);

    for (const violation of constantViolations) {
      types.push(violation.getTypeAnnotation());
    }
  }

  if (!types.length) {
    return;
  }

  if (t.isTSTypeAnnotation(types[0]) && t.createTSUnionType) {
    return t.createTSUnionType(types);
  }

  if (t.createFlowUnionType) {
    return t.createFlowUnionType(types);
  }

  return t.createUnionTypeAnnotation(types);
}