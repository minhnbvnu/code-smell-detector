function isRedundantSuperCall(body, ctorParams) {
        return (isSingleSuperCall(body) &&
            ctorParams.every(isSimple) &&
            (isSpreadArguments(body[0].expression.arguments) ||
                isPassingThrough(ctorParams, body[0].expression.arguments)));
    }