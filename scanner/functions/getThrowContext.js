function getThrowContext(state) {
        let context = state.tryContext;
        while (context) {
            if (context.position === "try" ||
                (context.hasFinalizer && context.position === "catch")) {
                return context;
            }
            context = context.upper;
        }
        return state;
    }