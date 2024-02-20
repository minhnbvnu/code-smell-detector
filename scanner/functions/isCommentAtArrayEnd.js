function isCommentAtArrayEnd(token) {
                return isCommentAtParentEnd(token, "ArrayExpression") || isCommentAtParentEnd(token, "ArrayPattern");
            }