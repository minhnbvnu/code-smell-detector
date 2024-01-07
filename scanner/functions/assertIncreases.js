function assertIncreases (subject, prop, msg) {
      if (msg) flag(this, 'message', msg);
      var fn = flag(this, 'object')
        , flagMsg = flag(this, 'message')
        , ssfi = flag(this, 'ssfi');
      new Assertion(fn, flagMsg, ssfi, true).is.a('function');

      var initial;
      if (!prop) {
        new Assertion(subject, flagMsg, ssfi, true).is.a('function');
        initial = subject();
      } else {
        new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
        initial = subject[prop];
      }

      // Make sure that the target is a number
      new Assertion(initial, flagMsg, ssfi, true).is.a('number');

      fn();

      var final = prop === undefined || prop === null ? subject() : subject[prop];
      var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

      flag(this, 'deltaMsgObj', msgObj);
      flag(this, 'initialDeltaValue', initial);
      flag(this, 'finalDeltaValue', final);
      flag(this, 'deltaBehavior', 'increase');
      flag(this, 'realDelta', final - initial);

      this.assert(
        final - initial > 0
        , 'expected ' + msgObj + ' to increase'
        , 'expected ' + msgObj + ' to not increase'
      );
    }