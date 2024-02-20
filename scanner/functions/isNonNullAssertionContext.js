function isNonNullAssertionContext(context) {
            return context.contextNode.kind === 232 /* NonNullExpression */;
        }