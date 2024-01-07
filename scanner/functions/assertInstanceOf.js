function assertInstanceOf (constructor, msg) {
      if (msg) flag(this, 'message', msg);

      var target = flag(this, 'object')
      var ssfi = flag(this, 'ssfi');
      var flagMsg = flag(this, 'message');

      try {
        var isInstanceOf = target instanceof constructor;
      } catch (err) {
        if (err instanceof TypeError) {
          flagMsg = flagMsg ? flagMsg + ': ' : '';
          throw new AssertionError(
            flagMsg + 'The instanceof assertion needs a constructor but '
              + _.type(constructor) + ' was given.',
            undefined,
            ssfi
          );
        }
        throw err;
      }

      var name = _.getName(constructor);
      if (name === null) {
        name = 'an unnamed constructor';
      }

      this.assert(
          isInstanceOf
        , 'expected #{this} to be an instance of ' + name
        , 'expected #{this} to not be an instance of ' + name
      );
    }