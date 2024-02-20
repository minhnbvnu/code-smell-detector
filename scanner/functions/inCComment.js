function inCComment(source, state) {
        source.skipToEnd();
        setState(state, normal);
        return "comment";
    }