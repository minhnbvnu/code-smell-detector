function isFunctionLike(node) {
            return !!node && isFunctionLikeKind(node.kind);
        }