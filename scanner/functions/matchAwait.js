function matchAwait() {
        return state.awaitAllowed && matchContextualKeyword('await');
    }