function parseArrowFunctionExpression(options, marker) {
        var previousStrict, previousYieldAllowed, previousAwaitAllowed, body;

        expect('=>');

        previousStrict = strict;
        previousYieldAllowed = state.yieldAllowed;
        state.yieldAllowed = false;
        previousAwaitAllowed = state.awaitAllowed;
        state.awaitAllowed = !!options.async;
        body = parseConciseBody();

        if (strict && options.firstRestricted) {
            throwError(options.firstRestricted, options.message);
        }
        if (strict && options.stricted) {
            throwErrorTolerant(options.stricted, options.message);
        }

        strict = previousStrict;
        state.yieldAllowed = previousYieldAllowed;
        state.awaitAllowed = previousAwaitAllowed;

        return markerApply(marker, delegate.createArrowFunctionExpression(
            options.params,
            options.defaults,
            body,
            options.rest,
            body.type !== Syntax.BlockStatement,
            !!options.async
        ));
    }