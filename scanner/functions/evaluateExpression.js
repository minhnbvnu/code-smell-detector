function evaluateExpression(expr, state = {}) {
  const tokens = tokenizeExpression(expr);

  if (tokens.length === 0 || tokens.some(({ type }) => !type)) {
    return invalidExpression(expr);
  }

  // e.g. {{>PlayButton section="center"}}
  if (tokens[0]?.token === '>') {
    const partial = state[tokens[1]?.token];
    if (!partial) {
      return invalidExpression(expr);
    }

    const partialState = { ...state };
    partial.state = partialState;

    // Adds support for arguments e.g. {{>PlayButton section="center"}}
    const args = tokens.slice(2);
    for (let i = 0; i < args.length; i += 3) {
      const name = args[i]?.token;
      const operator = args[i + 1]?.token;
      const value = args[i + 2]?.token;

      if (name && operator === '=') {
        partialState[name] = getParamValue(value, state);
      }
    }
    return partial;
  }

  // e.g. {{'hello world'}} or {{breakpointmd}}
  if (tokens.length === 1) {
    if (!isValidParam(tokens[0])) {
      return invalidExpression(expr);
    }
    return getParamValue(tokens[0].token, state);
  }

  // e.g. {{!targetlivewindow}} or {{!!lengthInBoolean}}
  if (tokens.length === 2) {
    const operator = tokens[0]?.token;
    const run = operators[operator];

    if (!run || !isValidParam(tokens[1])) {
      return invalidExpression(expr);
    }

    const a = getParamValue(tokens[1].token, state);
    return run(a);
  }

  // e.g. {{streamtype == 'on-demand'}}, {{val | string}}, {{section ?? 'bottom'}}
  if (tokens.length === 3) {
    const operator = tokens[1]?.token;
    const run = operators[operator];

    if (!run || !isValidParam(tokens[0]) || !isValidParam(tokens[2])) {
      return invalidExpression(expr);
    }

    const a = getParamValue(tokens[0].token, state);

    if (operator === '|') {
      return run(a, tokens[2].token);
    }

    const b = getParamValue(tokens[2].token, state);
    return run(a, b);
  }
}