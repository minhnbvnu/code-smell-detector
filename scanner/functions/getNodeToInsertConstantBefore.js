function getNodeToInsertConstantBefore(node, scope) {
            Debug.assert(!isClassLike(scope));
            let prevScope;
            for (let curr = node; curr !== scope; curr = curr.parent) {
                if (isScope(curr)) {
                    prevScope = curr;
                }
            }
            for (let curr = (prevScope || node).parent;; curr = curr.parent) {
                if (isBlockLike(curr)) {
                    let prevStatement;
                    for (const statement of curr.statements) {
                        if (statement.pos > node.pos) {
                            break;
                        }
                        prevStatement = statement;
                    }
                    if (!prevStatement && isCaseClause(curr)) {
                        Debug.assert(isSwitchStatement(curr.parent.parent), "Grandparent isn't a switch statement");
                        return curr.parent.parent;
                    }
                    return Debug.checkDefined(prevStatement, "prevStatement failed to get set");
                }
                Debug.assert(curr !== scope, "Didn't encounter a block-like before encountering scope");
            }
        }