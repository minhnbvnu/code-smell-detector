function findFirstSuperCall(node) {
                return isSuperCall(node) ? node : isFunctionLike(node) ? void 0 : forEachChild(node, findFirstSuperCall);
            }