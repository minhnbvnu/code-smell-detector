function applyStyles(element, options) {
      if (angular.isObject(options)) {
        var styles = extend(options.from || {}, options.to || {});
        element.css(styles);
      }
    }