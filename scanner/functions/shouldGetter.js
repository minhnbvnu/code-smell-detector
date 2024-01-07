function shouldGetter() {
        if (this instanceof String
            || this instanceof Number
            || this instanceof Boolean
            || typeof Symbol === 'function' && this instanceof Symbol) {
          return new Assertion(this.valueOf(), null, shouldGetter);
        }
        return new Assertion(this, null, shouldGetter);
      }