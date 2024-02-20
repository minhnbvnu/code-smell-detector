function isEndOfDecoratorContextOnSameLine(context) {
            return context.TokensAreOnSameLine() && hasDecorators(context.contextNode) && nodeIsInDecoratorContext(context.currentTokenParent) && !nodeIsInDecoratorContext(context.nextTokenParent);
        }