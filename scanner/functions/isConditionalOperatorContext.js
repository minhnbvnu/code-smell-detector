function isConditionalOperatorContext(context) {
            return context.contextNode.kind === 224 /* ConditionalExpression */ || context.contextNode.kind === 191 /* ConditionalType */;
        }