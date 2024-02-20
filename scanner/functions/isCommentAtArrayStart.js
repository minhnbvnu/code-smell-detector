function isCommentAtArrayStart(token) {
                return isCommentAtParentStart(token, "ArrayExpression") || isCommentAtParentStart(token, "ArrayPattern");
            }