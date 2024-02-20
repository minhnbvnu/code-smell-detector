function isSingleLineBlockContext(context) {
            return isBlockContext(context) && (context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine());
        }