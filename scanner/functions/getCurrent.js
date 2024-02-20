function getCurrent() {
  var schema = new Schema();
  var current = schema.current();

  return new Realm(current);
}