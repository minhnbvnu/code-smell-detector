function isTypeAssertionContext(context) {
            return context.contextNode.kind === 213 /* TypeAssertionExpression */;
        }