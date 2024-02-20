function createError(err, code, props) {
      if (!err || typeof err === "string") {
        throw new TypeError("Please pass an Error to err-code");
      }
      if (!props) {
        props = {};
      }
      if (typeof code === "object") {
        props = code;
        code = "";
      }
      if (code) {
        props.code = code;
      }
      try {
        return assign(err, props);
      } catch (_) {
        props.message = err.message;
        props.stack = err.stack;
        const ErrClass = function() {
        };
        ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
        const output = assign(new ErrClass(), props);
        return output;
      }
    }