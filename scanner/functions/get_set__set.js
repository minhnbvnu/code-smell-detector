function get_set__set (mom, unit, value) {
          return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
      }