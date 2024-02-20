function addAttrwrapper(originalRender) {
    return function (tokens, idx, options, env, self) {
      const token = tokens[idx];

      token.attrPush([lineMarkup, token.map[0] + 1]);

      return originalRender(tokens, idx, options, env, self);
    };
  }