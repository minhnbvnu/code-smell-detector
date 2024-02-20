function isFunctionCallContext(context) {
            return context.contextNode.kind === 210 /* CallExpression */;
        }