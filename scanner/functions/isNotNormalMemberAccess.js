function isNotNormalMemberAccess(reference) {
        const id = reference.identifier;
        const parent = id.parent;
        return !(parent.type === "MemberExpression" &&
            parent.object === id &&
            !parent.computed);
    }