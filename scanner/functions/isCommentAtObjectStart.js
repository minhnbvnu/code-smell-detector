function isCommentAtObjectStart(token) {
                return isCommentAtParentStart(token, "ObjectExpression") || isCommentAtParentStart(token, "ObjectPattern");
            }