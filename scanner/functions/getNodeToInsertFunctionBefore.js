function getNodeToInsertFunctionBefore(minPos, scope) {
            return find(getStatementsOrClassElements(scope), (child) => child.pos >= minPos && isFunctionLikeDeclaration(child) && !isConstructorDeclaration(child));
        }