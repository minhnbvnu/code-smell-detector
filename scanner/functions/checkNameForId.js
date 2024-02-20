function checkNameForId(node, name, id) {
    const allowedNames = ALLOWED_NAMES_BY_MODULE[id];
    if (allowedNames.indexOf(name) === -1) {
      context.report({
        node,
        data: {
          id,
          names: prettyNames(allowedNames),
        },
        message: '{{id}} should be named {{names}}',
      });
    }
  }