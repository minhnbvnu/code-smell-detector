function pushStack(state, indent, type) {
        state.indentStack = new stateStack(indent, type, state.indentStack);
    }