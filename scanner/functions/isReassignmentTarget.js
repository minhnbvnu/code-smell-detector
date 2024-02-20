function isReassignmentTarget(node) {
        return (getAccessKind(node) & 2 /* Write */) !== 0;
    }