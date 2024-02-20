function registerEventName(emitted) {
        const { node } = emitted;
        (!emitted.exit) && events.push({ node, enclosingContract: sourceCode.getParent(node) });
    }