function Match(path, route, match, query, valueDecoders) {
  this.path = path;
  this.route = route;
  this.match = match;
  this.query = query;

  if (valueDecoders) {
    Object.keys(match || {}).forEach(function(key) {
      if (typeof valueDecoders === 'function') {
        match[key] = valueDecoders(key, match[key]);
        return;
      }
      var fn = Object.prototype.hasOwnProperty.call(valueDecoders, key) && valueDecoders[key];
      if (typeof fn === 'function') {
        match[key] = fn(match[key]);
      }
    });
  }

  this.unmatchedPath = this.match && this.match._ ?
    this.match._[0] :
    null;

  this.matchedPath = this.unmatchedPath ?
    this.path.substring(0, this.path.length - this.unmatchedPath.length) :
    this.path;
}