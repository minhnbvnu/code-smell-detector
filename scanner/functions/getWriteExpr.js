function getWriteExpr(reference) {
        if (reference.writeExpr) {
            return reference.writeExpr;
        }
        let node = reference.identifier;
        while (node) {
            const t = node.parent.type;
            if (t === "AssignmentExpression" && node.parent.left === node) {
                return node.parent.right;
            }
            if (t === "MemberExpression" && node.parent.object === node) {
                node = node.parent;
                continue;
            }
            break;
        }
        return null;
    }