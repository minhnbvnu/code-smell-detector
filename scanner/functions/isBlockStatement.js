function isBlockStatement(node) {
            if (node.kind !== 238 /* Block */)
                return false;
            if (node.parent !== void 0) {
                if (node.parent.kind === 255 /* TryStatement */ || node.parent.kind === 295 /* CatchClause */) {
                    return false;
                }
            }
            return !isFunctionBlock(node);
        }