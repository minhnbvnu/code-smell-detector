function getBreakContext(state, label) {
        let context = state.breakContext;
        while (context) {
            if (label ? context.label === label : context.breakable) {
                return context;
            }
            context = context.upper;
        }
        /* c8 ignore next */
        return null;
    }