function assertThrows (constructor, errMsg, msg) {
        if (msg) flag(this, 'message', msg);
        var obj = flag(this, 'object');
        new Assertion(obj, msg).is.a('function');

        var thrown = false
          , desiredError = null
          , name = null
          , thrownError = null;

        if (arguments.length === 0) {
          errMsg = null;
          constructor = null;
        } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {
          errMsg = constructor;
          constructor = null;
        } else if (constructor && constructor instanceof Error) {
          desiredError = constructor;
          constructor = null;
          errMsg = null;
        } else if (typeof constructor === 'function') {
          name = (new constructor()).name;
        } else {
          constructor = null;
        }

        try {
          obj();
        } catch (err) {
          // first, check desired error
          if (desiredError) {
            this.assert(
                err === desiredError
              , 'expected #{this} to throw ' + _.inspect(desiredError) + ' but ' + _.inspect(err) + ' was thrown'
              , 'expected #{this} to not throw ' + _.inspect(desiredError)
            );
            return this;
          }
          // next, check constructor
          if (constructor) {
            this.assert(
                err instanceof constructor
              , 'expected #{this} to throw ' + name + ' but ' + _.inspect(err) + ' was thrown'
              , 'expected #{this} to not throw ' + name + ' but ' + _.inspect(err) + ' was thrown');
            if (!errMsg) return this;
          }
          // next, check message
          if (err.message && errMsg && errMsg instanceof RegExp) {
            this.assert(
                errMsg.exec(err.message)
              , 'expected #{this} to throw error matching ' + errMsg + ' but got ' + _.inspect(err.message)
              , 'expected #{this} to throw error not matching ' + errMsg
            );
            return this;
          } else if (err.message && errMsg && 'string' === typeof errMsg) {
            this.assert(
                ~err.message.indexOf(errMsg)
              , 'expected #{this} to throw error including #{exp} but got #{act}'
              , 'expected #{this} to throw error not including #{act}'
              , errMsg
              , err.message
            );
            return this;
          } else {
            thrown = true;
            thrownError = err;
          }
        }

        var expectedThrown = name ? name : desiredError ? _.inspect(desiredError) : 'an error';
        var actuallyGot = ''
        if (thrown) {
          actuallyGot = ' but ' + _.inspect(thrownError) + ' was thrown'
        }

        this.assert(
            thrown === true
          , 'expected #{this} to throw ' + expectedThrown + actuallyGot
          , 'expected #{this} to not throw ' + expectedThrown + actuallyGot
        );
      }