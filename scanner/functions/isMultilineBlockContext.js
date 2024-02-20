function isMultilineBlockContext(context) {
            return isBlockContext(context) && !(context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine());
        }