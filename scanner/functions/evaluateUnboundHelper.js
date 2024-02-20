function evaluateUnboundHelper(context, fn, normalizedProperties, options) {
  var args = [], hash = options.hash, boundOptions = hash.boundOptions, loc, len, property, boundOption;

  for (boundOption in boundOptions) {
    if (!boundOptions.hasOwnProperty(boundOption)) { continue; }
    hash[boundOption] = Ember.Handlebars.get(context, boundOptions[boundOption], options);
  }

  for(loc = 0, len = normalizedProperties.length; loc < len; ++loc) {
    property = normalizedProperties[loc];
    args.push(Ember.Handlebars.get(context, property.path, options));
  }
  args.push(options);
  return fn.apply(context, args);
}