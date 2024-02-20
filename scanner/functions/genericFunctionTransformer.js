function genericFunctionTransformer(traverse, node, path, state) {
  // The typechecks transform has a static-only mode that doesn't actually
  // perform a transform but validates the types.
  processStaticOnly(node, state, params);

  var params = getAllParams(node, state);
  var transformsForFile = getTransformsForFile(state, utils.getDocblock(state));
  var transformsForFunction =
    getTransformsForFunction(
       transformsForFile,
       node,
       state,
       utils.getDocblock(state),
       params
    );

  if (transformsForFunction.length === 0) {
    traverse(node.body, path, state);
    return;
  }

  var wrapBody = shouldWrapBody(transformsForFunction);
  var annotate = shouldAnnotate(transformsForFunction);

  // There are two different objects containing the params for the wrapper
  // vs annotator because the type param information only makes sense inside
  // the body wrapper like [x, 'number', 'x']. During execution the body wrapper
  // will be passed the correct values whereas during the annotator the
  // arguments don't exist yet.
  var bodyParams = wrapBody ? formatBodyParams(node, state, params) : null;
  var annotatorParams = annotate ? formatAnnotatorParams(params) : null;
  var funcMeta = getFunctionMetadata(node, state);

  // If there are no params to pass to the body, then don't wrap the
  // body function.
  wrapBody = wrapBody && bodyParams !== null;
  var renderedBodyParams = renderParams(bodyParams);

  if (node.type === Syntax.FunctionExpression && annotate) {
    utils.append('__annotator(', state);
  }

  // Enter function body.
  utils.catchup(node.body.range[0] + 1, state);

  // Insert a function that wraps the function body.
  if (wrapBody) {
    utils.append(
      'return __bodyWrapper(this, arguments, function() {',
      state
    );
  }

  // Recurse down into the child.
  traverse(node.body, path, state);
  // Move the cursor to the end of the function body.
  utils.catchup(node.body.range[1] - 1, state);

  // Close the inserted function.
  if (wrapBody) {
    utils.append(util.format('}, %s);', renderedBodyParams), state);
  }

  // Write the closing } of the function.
  utils.catchup(node.range[1], state);

  if (!annotate) {
    return;
  }

  if (node.type === Syntax.FunctionExpression) {
    utils.append(
      getTrailingAnnotatorArguments(funcMeta, annotatorParams),
      state
    );
  } else if (node.type === Syntax.FunctionDeclaration) {
    utils.append(
      util.format(
        '__annotator(%s',
        node.id.name
      ) + getTrailingAnnotatorArguments(funcMeta, annotatorParams) + ';',
      state
    );
  }
}