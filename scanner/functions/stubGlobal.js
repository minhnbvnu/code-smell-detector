function stubGlobal(method, clock) {
    clock[method].hadOwnProperty = Object.prototype.hasOwnProperty.call(global, method);
    clock["_" + method] = global[method];

    if (method == "Date") {
      var date = mirrorDateProperties(clock[method], global[method]);
      global[method] = date;
    } else {
      global[method] = function () {
        return clock[method].apply(clock, arguments);
      };

      for (var prop in clock[method]) {
        if (clock[method].hasOwnProperty(prop)) {
          global[method][prop] = clock[method][prop];
        }
      }
    }

    global[method].clock = clock;
  }