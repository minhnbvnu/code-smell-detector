function getWrappedNodeAtPosition(wrap, pos) {
        if (wrap.node.pos > pos || wrap.node.end <= pos)
            return;
        outer: while (true) {
            for (const child of wrap.children) {
                if (child.node.pos > pos)
                    return wrap;
                if (child.node.end > pos) {
                    wrap = child;
                    continue outer;
                }
            }
            return wrap;
        }
    }