function getConditionalAnnotation(binding, path, name) {
  const ifStatement = getParentConditionalPath(binding, path, name);
  if (!ifStatement) return;
  const test = ifStatement.get("test");
  const paths = [test];
  const types = [];

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];

    if (path.isLogicalExpression()) {
      if (path.node.operator === "&&") {
        paths.push(path.get("left"));
        paths.push(path.get("right"));
      }
    } else if (path.isBinaryExpression()) {
      const type = inferAnnotationFromBinaryExpression(name, path);
      if (type) types.push(type);
    }
  }

  if (types.length) {
    if (t.isTSTypeAnnotation(types[0]) && t.createTSUnionType) {
      return {
        typeAnnotation: t.createTSUnionType(types),
        ifStatement
      };
    }

    if (t.createFlowUnionType) {
      return {
        typeAnnotation: t.createFlowUnionType(types),
        ifStatement
      };
    }

    return {
      typeAnnotation: t.createUnionTypeAnnotation(types),
      ifStatement
    };
  }

  return getConditionalAnnotation(ifStatement, name);
}