function isCommentAtTypeEnd(token) {
                return isCommentAtParentEnd(token, utils_1.AST_NODE_TYPES.TSTypeLiteral);
            }