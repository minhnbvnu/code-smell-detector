function expandSpec(spec, color) {
  var prefixes = [];
  var db = Db.getInstance();
  spec.forEach(function(desc) {
    if (kCountryCodePattern.test(desc)) {
      [].push.apply(prefixes, db.getPrefixesOfCountry(desc));
    } else {
      prefixes.push(Prefix.parse(desc));
    }
  });
  prefixes.forEach(function(prefix) {
    prefix.color = color;
  });
  return prefixes;
}