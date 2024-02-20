function findSuperCall(n) {
            return isExpressionStatement(n) && isSuperCall(n.expression) ? n : isFunctionLike(n) ? void 0 : forEachChild(n, findSuperCall);
        }