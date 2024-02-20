function _observe(observer, obj, patches) {
    if (Object.observe) {
      Object.observe(obj, observer);
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var v = obj[key];
          if (v && typeof (v) === "object") {
            _observe(observer, v, patches);
          }
        }
      }
    }
    return observer;
  }