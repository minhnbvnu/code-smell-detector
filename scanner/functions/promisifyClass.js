function promisifyClass(Klass) {
  if (_.isString(Klass)) {
    Klass = require(Klass);
  }

  var NewClass = function(...args) {
    Klass.call(this, ...args);
  };

  NewClass.prototype = Object.create(Klass.prototype);
  NewClass.prototype.constructor = Klass;

  _.each(_.methods(Klass.prototype), (method) => {
    var original = Klass.prototype[method];
    NewClass.prototype[method] = function(...args) {
      return BB.promisify(original.bind(this))(...args);
    };
  });

  return NewClass;
}