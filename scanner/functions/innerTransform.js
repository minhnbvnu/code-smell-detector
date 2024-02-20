function innerTransform(input, options) {
  var visitorSets = ['react'];
  if (options.harmony) {
    visitorSets.push('harmony');
  }

  if (options.es3) {
    visitorSets.push('es3');
  }

  if (options.stripTypes) {
    // Stripping types needs to happen before the other transforms
    // unfortunately, due to bad interactions. For example,
    // es6-rest-param-visitors conflict with stripping rest param type
    // annotation
    input = transform(typesSyntax.visitorList, input, options).code;
  }

  var visitorList = visitors.getVisitorsBySet(visitorSets);
  return transform(visitorList, input, options);
}