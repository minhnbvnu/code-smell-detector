function isBeforeMultilineBlockContext(context) {
            return isBeforeBlockContext(context) && !(context.NextNodeAllOnSameLine() || context.NextNodeBlockIsOnOneLine());
        }