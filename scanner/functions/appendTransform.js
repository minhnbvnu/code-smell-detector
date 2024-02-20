function appendTransform(defaults, transform) {
    defaults = angular.isArray(defaults) ? defaults : [defaults];
    return (transform) ? defaults.concat(transform) : defaults;
  }