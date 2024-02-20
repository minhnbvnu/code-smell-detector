function mustImplement(name) {
  return function() {
    throw new Ember.Error("Your serializer " + this.toString() + " does not implement the required method " + name);
  };
}