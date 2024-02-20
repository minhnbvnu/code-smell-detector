function volatile(target, name, descriptor) {
  return Object.assign({}, descriptor, {
    get: function () {
      Observable.trackVolatile();
      return descriptor.get.apply(this);
    }
  });
}