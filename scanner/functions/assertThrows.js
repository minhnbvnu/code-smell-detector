function assertThrows (errorLike, errMsgMatcher, msg) {
      if (msg) flag(this, 'message', msg);
      var obj = flag(this, 'object')
        , ssfi = flag(this, 'ssfi')
        , flagMsg = flag(this, 'message')
        , negate = flag(this, 'negate') || false;
      new Assertion(obj, flagMsg, ssfi, true).is.a('function');

      if (errorLike instanceof RegExp || typeof errorLike === 'string') {
        errMsgMatcher = errorLike;
        errorLike = null;
      }

      var caughtErr;
      try {
        obj();
      } catch (err) {
        caughtErr = err;
      }

      // If we have the negate flag enabled and at least one valid argument it means we do expect an error
      // but we want it to match a given set of criteria
      var everyArgIsUndefined = errorLike === undefined && errMsgMatcher === undefined;

      // If we've got the negate flag enabled and both args, we should only fail if both aren't compatible
      // See Issue #551 and PR #683@GitHub
      var everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
      var errorLikeFail = false;
      var errMsgMatcherFail = false;

      // Checking if error was thrown
      if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
        // We need this to display results correctly according to their types
        var errorLikeString = 'an error';
        if (errorLike instanceof Error) {
          errorLikeString = '#{exp}';
        } else if (errorLike) {
          errorLikeString = _.checkError.getConstructorName(errorLike);
        }

        this.assert(
            caughtErr
          , 'expected #{this} to throw ' + errorLikeString
          , 'expected #{this} to not throw an error but #{act} was thrown'
          , errorLike && errorLike.toString()
          , (caughtErr instanceof Error ?
              caughtErr.toString() : (typeof caughtErr === 'string' ? caughtErr : caughtErr &&
                                      _.checkError.getConstructorName(caughtErr)))
        );
      }

      if (errorLike && caughtErr) {
        // We should compare instances only if `errorLike` is an instance of `Error`
        if (errorLike instanceof Error) {
          var isCompatibleInstance = _.checkError.compatibleInstance(caughtErr, errorLike);

          if (isCompatibleInstance === negate) {
            // These checks were created to ensure we won't fail too soon when we've got both args and a negate
            // See Issue #551 and PR #683@GitHub
            if (everyArgIsDefined && negate) {
              errorLikeFail = true;
            } else {
              this.assert(
                  negate
                , 'expected #{this} to throw #{exp} but #{act} was thrown'
                , 'expected #{this} to not throw #{exp}' + (caughtErr && !negate ? ' but #{act} was thrown' : '')
                , errorLike.toString()
                , caughtErr.toString()
              );
            }
          }
        }

        var isCompatibleConstructor = _.checkError.compatibleConstructor(caughtErr, errorLike);
        if (isCompatibleConstructor === negate) {
          if (everyArgIsDefined && negate) {
              errorLikeFail = true;
          } else {
            this.assert(
                negate
              , 'expected #{this} to throw #{exp} but #{act} was thrown'
              , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
              , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
              , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
            );
          }
        }
      }

      if (caughtErr && errMsgMatcher !== undefined && errMsgMatcher !== null) {
        // Here we check compatible messages
        var placeholder = 'including';
        if (errMsgMatcher instanceof RegExp) {
          placeholder = 'matching'
        }

        var isCompatibleMessage = _.checkError.compatibleMessage(caughtErr, errMsgMatcher);
        if (isCompatibleMessage === negate) {
          if (everyArgIsDefined && negate) {
              errMsgMatcherFail = true;
          } else {
            this.assert(
              negate
              , 'expected #{this} to throw error ' + placeholder + ' #{exp} but got #{act}'
              , 'expected #{this} to throw error not ' + placeholder + ' #{exp}'
              ,  errMsgMatcher
              ,  _.checkError.getMessage(caughtErr)
            );
          }
        }
      }

      // If both assertions failed and both should've matched we throw an error
      if (errorLikeFail && errMsgMatcherFail) {
        this.assert(
          negate
          , 'expected #{this} to throw #{exp} but #{act} was thrown'
          , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
          , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
          , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
        );
      }

      flag(this, 'object', caughtErr);
    }