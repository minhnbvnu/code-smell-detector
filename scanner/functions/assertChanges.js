function assertChanges (subject, prop, msg) {
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

      fn();

      var final = prop === undefined || prop === null ? subject() : subject[prop];
      var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

      // This gets flagged because of the .by(delta) assertion
      flag(this, 'deltaMsgObj', msgObj);
      flag(this, 'initialDeltaValue', initial);
      flag(this, 'finalDeltaValue', final);
      flag(this, 'deltaBehavior', 'change');
      flag(this, 'realDelta', final !== initial);

      this.assert(
        initial !== final
        , 'expected ' + msgObj + ' to change'
        , 'expected ' + msgObj + ' to not change'
      );
    }