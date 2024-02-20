function mixInEventEmitter(klass, types) {
  invariant(types, 'Must supply set of valid event types');

  // If this is a constructor, write to the prototype, otherwise write to the
  // singleton object.
  var target = klass.prototype || klass;

  invariant(!target.__eventEmitter, 'An active emitter is already mixed in');

  var ctor = klass.constructor;
  if (ctor) {
    invariant(
      ctor === Object || ctor === Function,
      'Mix EventEmitter into a class, not an instance'
    );
  }

  // Keep track of the provided types, union the types if they already exist,
  // which allows for prototype subclasses to provide more types.
  if (target.hasOwnProperty(TYPES_KEY)) {
    copyProperties(target.__types, types);
  } else if (target.__types) {
    target.__types = copyProperties({}, target.__types, types);
  } else {
    target.__types = types;
  }
  copyProperties(target, EventEmitterMixin);
}