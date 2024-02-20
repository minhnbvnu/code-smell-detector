function parseGraphql (body, indentString) {
  let query = body ? body.query : '',
    graphqlVariables = body ? body.variables : '{}';
  try {
    graphqlVariables = JSON.parse(graphqlVariables || '{}');
  }
  catch (e) {
    graphqlVariables = {};
  }
  return indentString + '.send(JSON.stringify({\n' +
    `${indentString.repeat(2)}query: \`${query ? query.trim() : ''}\`,\n` +
    `${indentString.repeat(2)}variables: ${JSON.stringify(graphqlVariables)}\n` +
    `${indentString}}))\n`;
}