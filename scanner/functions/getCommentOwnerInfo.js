function getCommentOwnerInfo(tokenAtPos, options) {
            return forEachAncestor(tokenAtPos, (n) => getCommentOwnerInfoWorker(n, options));
        }