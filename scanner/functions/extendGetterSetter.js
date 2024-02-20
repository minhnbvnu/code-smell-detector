function extendGetterSetter(propertyName) {
      defaultScope.defineProperty(subClass, propertyName, {
        get: function() {
          return baseClass[propertyName]
        },
        set: function(v) {
          baseClass[propertyName] = v
        },
        enumerable: true
      })
    }