function closeTo(expected, delta, msg) {
      if (msg) flag(this, 'message', msg);
      var obj = flag(this, 'object')
        , flagMsg = flag(this, 'message')
        , ssfi = flag(this, 'ssfi');

      new Assertion(obj, flagMsg, ssfi, true).is.a('number');
      if (typeof expected !== 'number' || typeof delta !== 'number') {
        flagMsg = flagMsg ? flagMsg + ': ' : '';
        throw new AssertionError(
            flagMsg + 'the arguments to closeTo or approximately must be numbers',
            undefined,
            ssfi
        );
      }

      this.assert(
          Math.abs(obj - expected) <= delta
        , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
        , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
      );
    }