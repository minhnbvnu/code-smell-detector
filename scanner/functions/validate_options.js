function validate_options(options, warnings) {
    const { name: name2, filename, loopGuardTimeout, dev, namespace, css } = options;
    Object.keys(options).forEach((key) => {
      if (!valid_options.includes(key)) {
        const match = fuzzymatch(key, valid_options);
        let message = `Unrecognized option '${key}'`;
        if (match)
          message += ` (did you mean '${match}'?)`;
        throw new Error(message);
      }
    });
    if (name2 && !regex_valid_identifier.test(name2)) {
      throw new Error(`options.name must be a valid identifier (got '${name2}')`);
    }
    if (name2 && regex_starts_with_lowercase_character.test(name2)) {
      const message = "options.name should be capitalised";
      warnings.push({
        code: "options-lowercase-name",
        message,
        filename,
        toString: () => message
      });
    }
    if (loopGuardTimeout && !dev) {
      const message = "options.loopGuardTimeout is for options.dev = true only";
      warnings.push({
        code: "options-loop-guard-timeout",
        message,
        filename,
        toString: () => message
      });
    }
    if (valid_css_values.indexOf(css) === -1) {
      throw new Error(`options.css must be true, false, 'injected', 'external', or 'none' (got '${css}')`);
    }
    if (css === true || css === false) {
      options.css = css === true ? "injected" : "external";
    }
    if (namespace && valid_namespaces.indexOf(namespace) === -1) {
      const match = fuzzymatch(namespace, valid_namespaces);
      if (match) {
        throw new Error(`Invalid namespace '${namespace}' (did you mean '${match}'?)`);
      } else {
        throw new Error(`Invalid namespace '${namespace}'`);
      }
    }
  }