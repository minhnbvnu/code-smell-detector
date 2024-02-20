function parseGraphQL (body, mode, trim) {
  if (_.isEmpty(body)) {
    return '';
  }
  let query = body.query,
    graphqlVariables, bodySnippet;
  try {
    graphqlVariables = JSON.parse(body.variables);
  }
  catch (e) {
    graphqlVariables = {};
  }
  bodySnippet = `let parameters = ${sanitize(JSON.stringify({
    query: query,
    variables: graphqlVariables
  }), mode, trim)}\n`;
  bodySnippet += 'let postData = parameters.data(using: .utf8)';
  return bodySnippet;
}