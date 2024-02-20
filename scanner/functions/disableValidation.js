function disableValidation() {
    return function() {
      var parent = this.parent;
      return parent
        .findByCssSelector("#validate")
        .then(function(el) {
          // If the checkbox's "checked" property is true, then click to uncheck.
          // Why click() and not set the property directly? Because the cookie
          // in HAR Viewer is only set when a click event occurs.
          // Alternatively, we could set the cookie directly.
          return el.getProperty("checked")
            .then(function(checked) {
              return checked ? el.click() : 1;
            });
        });
    };
  }