function getContinueContext(state, label) {
        if (!label) {
            return state.loopContext;
        }
        let context = state.loopContext;
        while (context) {
            if (context.label === label) {
                return context;
            }
            context = context.upper;
        }
        /* c8 ignore next */
        return null;
    }