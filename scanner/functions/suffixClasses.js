function suffixClasses(classes, suffix) {
        var className = '';
        classes = isArray(classes) ? classes : classes.split(/\s+/);
        forEach(classes, function(klass, i) {
          if (klass && klass.length > 0) {
            className += (i > 0 ? ' ' : '') + klass + suffix;
          }
        });
        return className;
      }