function modifyCodewrapper(originalRender) {
    return function (tokens, idx, options, env, self) {
      const rawCode = originalRender(tokens, idx, options, env, self);
      const token = tokens[idx];
      const lineNumber = token.map[0] + 1;

      return `<div ${lineMarkup}="${lineNumber}">${rawCode}</div>`;
    };
  }