function outNonAlpineAttributes({name}) {
  return alpineAttributeRegex().test(name);
}