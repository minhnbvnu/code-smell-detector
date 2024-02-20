function Attributes(element, attributesToCopy) {
      if (attributesToCopy) {
        var keys = Object.keys(attributesToCopy);
        var i, l, key;

        for (i = 0, l = keys.length; i < l; i++) {
          key = keys[i];
          this[key] = attributesToCopy[key];
        }
      } else {
        this.$attr = {};
      }

      this.$$element = element;
    }