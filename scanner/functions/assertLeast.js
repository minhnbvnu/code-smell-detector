function assertLeast (n, msg) {
      if (msg) flag(this, 'message', msg);
      var obj = flag(this, 'object')
        , doLength = flag(this, 'doLength')
        , flagMsg = flag(this, 'message')
        , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
        , ssfi = flag(this, 'ssfi')
        , objType = _.type(obj).toLowerCase()
        , nType = _.type(n).toLowerCase()
        , shouldThrow = true;

      if (doLength) {
        new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
      }

      if (!doLength && (objType === 'date' && nType !== 'date')) {
        errorMessage = msgPrefix + 'the argument to least must be a date';
      } else if (nType !== 'number' && (doLength || objType === 'number')) {
        errorMessage = msgPrefix + 'the argument to least must be a number';
      } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
        var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
        errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
      } else {
        shouldThrow = false;
      }

      if (shouldThrow) {
        throw new AssertionError(errorMessage, undefined, ssfi);
      }

      if (doLength) {
        var len = obj.length;
        this.assert(
            len >= n
          , 'expected #{this} to have a length at least #{exp} but got #{act}'
          , 'expected #{this} to have a length below #{exp}'
          , n
          , len
        );
      } else {
        this.assert(
            obj >= n
          , 'expected #{this} to be at least #{exp}'
          , 'expected #{this} to be below #{exp}'
          , n
        );
      }
    }