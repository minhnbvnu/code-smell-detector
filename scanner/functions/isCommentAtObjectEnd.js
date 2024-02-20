function isCommentAtObjectEnd(token) {
                return isCommentAtParentEnd(token, "ObjectExpression") || isCommentAtParentEnd(token, "ObjectPattern");
            }