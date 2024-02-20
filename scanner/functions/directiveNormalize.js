function directiveNormalize(name) {
  return camelCase(name.replace(PREFIX_REGEXP, ''));
}