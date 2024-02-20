function isTypeArgumentOrParameterOrAssertionContext(context) {
            return isTypeArgumentOrParameterOrAssertion(context.currentTokenSpan, context.currentTokenParent) || isTypeArgumentOrParameterOrAssertion(context.nextTokenSpan, context.nextTokenParent);
        }