function assertOwnProperty (name, value, msg) {
      flag(this, 'own', true);
      assertProperty.apply(this, arguments);
    }