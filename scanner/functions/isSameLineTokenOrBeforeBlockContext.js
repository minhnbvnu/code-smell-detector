function isSameLineTokenOrBeforeBlockContext(context) {
            return context.TokensAreOnSameLine() || isBeforeBlockContext(context);
        }