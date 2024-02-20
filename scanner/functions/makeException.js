function makeException(exception) {
  if (!exception.object && !exception.property) {
    return _.stubFalse;
  }
  let query = {type: 'MemberExpression'};
  if (exception.object) {
    query = _.assign(query, {object: {type: 'Identifier', name: exception.object}});
  }
  if (exception.property) {
    query = _.assign(query, {property: {type: 'Identifier', name: exception.property}});
  }
  return _.matches(query);
}