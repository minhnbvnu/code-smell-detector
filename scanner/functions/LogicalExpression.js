function LogicalExpression() {
  const argumentTypes = [this.get("left").getTypeAnnotation(), this.get("right").getTypeAnnotation()];

  if (t.isTSTypeAnnotation(argumentTypes[0]) && t.createTSUnionType) {
    return t.createTSUnionType(argumentTypes);
  }

  if (t.createFlowUnionType) {
    return t.createFlowUnionType(argumentTypes);
  }

  return t.createUnionTypeAnnotation(argumentTypes);
}