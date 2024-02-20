function assertInstanceOf (constructor, msg) {
        if (msg) flag(this, 'message', msg);
        var name = _.getName(constructor);
        this.assert(
            flag(this, 'object') instanceof constructor
          , 'expected #{this} to be an instance of ' + name
          , 'expected #{this} to not be an instance of ' + name
        );
      }