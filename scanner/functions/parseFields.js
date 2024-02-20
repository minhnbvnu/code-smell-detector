function parseFields(fields) {
  var variables = {};

  _(fields).each(function(value, key) {
    variables[key] = parseValue(value);
  });

  return variables;
}