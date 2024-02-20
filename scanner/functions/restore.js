function restore() {
    var method;

    for (var i = 0, l = this.methods.length; i < l; i++) {
      method = this.methods[i];
      if (global[method].hadOwnProperty) {
        global[method] = this["_" + method];
      } else {
        delete global[method];
      }
    }

    // Prevent multiple executions which will completely remove these props
    this.methods = [];
  }