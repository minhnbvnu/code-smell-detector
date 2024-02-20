function isAllDefined(value) {
        var allDefined = true;
        forEach(value, function(val) {
          if (!isDefined(val)) allDefined = false;
        });
        return allDefined;
      }