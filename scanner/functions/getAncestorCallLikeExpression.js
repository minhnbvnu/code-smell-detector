function getAncestorCallLikeExpression(node) {
            const target = findAncestor(node, (n) => !isRightSideOfPropertyAccess(n));
            const callLike = target == null ? void 0 : target.parent;
            return callLike && isCallLikeExpression(callLike) && getInvokedExpression(callLike) === target ? callLike : void 0;
        }