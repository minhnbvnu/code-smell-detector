function assertDelta(delta, msg) {
      if (msg) flag(this, 'message', msg);

      var msgObj = flag(this, 'deltaMsgObj');
      var initial = flag(this, 'initialDeltaValue');
      var final = flag(this, 'finalDeltaValue');
      var behavior = flag(this, 'deltaBehavior');
      var realDelta = flag(this, 'realDelta');

      var expression;
      if (behavior === 'change') {
        expression = Math.abs(final - initial) === Math.abs(delta);
      } else {
        expression = realDelta === Math.abs(delta);
      }

      this.assert(
        expression
        , 'expected ' + msgObj + ' to ' + behavior + ' by ' + delta
        , 'expected ' + msgObj + ' to not ' + behavior + ' by ' + delta
      );
    }