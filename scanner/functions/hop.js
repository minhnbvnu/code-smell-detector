function hop(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }