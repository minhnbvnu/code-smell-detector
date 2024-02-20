function updateData(data, classes, value) {
      var changed = false;
      if (classes) {
        classes = isString(classes) ? classes.split(' ') :
                  isArray(classes) ? classes : [];
        forEach(classes, function(className) {
          if (className) {
            changed = true;
            data[className] = value;
          }
        });
      }
      return changed;
    }