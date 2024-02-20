function parseObject(typeName, ast, variables) {
  const value = Object.create(null);
  ast.fields.forEach((field) => {
    // eslint-disable-next-line no-use-before-define
    value[field.name.value] = parseLiteral(typeName, field.value, variables);
  });

  return value;
}