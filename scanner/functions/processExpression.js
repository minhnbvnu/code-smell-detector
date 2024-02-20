function processExpression(node, context, asParams = false, asRawStatements = false, localVars = Object.create(context.identifiers)) {
    {
      {
        validateBrowserExpression(node, context, asParams, asRawStatements);
      }
      return node;
    }
  }