function doAsserterAsyncAndAddThen(asserter, assertion, args) {
            // Since we're intercepting all methods/properties, we need to just pass through if they don't want
            // `eventually`, or if we've already fulfilled the promise (see below).
            if (!utils.flag(assertion, "eventually")) {
                return asserter.apply(assertion, args);
            }

            var derivedPromise = getBasePromise(assertion).then(function (value) {
                // Set up the environment for the asserter to actually run: `_obj` should be the fulfillment value, and
                // now that we have the value, we're no longer in "eventually" mode, so we won't run any of this code,
                // just the base Chai code that we get to via the short-circuit above.
                assertion._obj = value;
                utils.flag(assertion, "eventually", false);

                return args ? chaiAsPromised.transformAsserterArgs(args) : args;
            }).then(function (args) {
                asserter.apply(assertion, args);

                // Because asserters, for example `property`, can change the value of `_obj` (i.e. change the "object"
                // flag), we need to communicate this value change to subsequent chained asserters. Since we build a
                // promise chain paralleling the asserter chain, we can use it to communicate such changes.
                return assertion._obj;
            });

            chaiAsPromised.transferPromiseness(assertion, derivedPromise);
        }