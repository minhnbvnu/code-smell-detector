function mirrorDateProperties(target, source) {
    if (source.now) {
      target.now = function now() {
        return target.clock.now;
      };
    } else {
      delete target.now;
    }

    if (source.toSource) {
      target.toSource = function toSource() {
        return source.toSource();
      };
    } else {
      delete target.toSource;
    }

    target.toString = function toString() {
      return source.toString();
    };

    target.prototype = source.prototype;
    target.parse = source.parse;
    target.UTC = source.UTC;
    target.prototype.toUTCString = source.prototype.toUTCString;
    return target;
  }