function matcherForSpec(spec) {
  if (typeof spec === 'string') {
    if (spec[0] === '"' && spec[spec.length - 1] === '"') {
      return {
        type: spec.substr(1, spec.length - 2),
        named: false
      };
    }

    if (!NODE_NAME_REGEX.test(spec)) {
      return { type: spec, named: false };
    }

    return { type: spec, named: true };
  }
  return spec;
}