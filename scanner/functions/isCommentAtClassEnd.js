function isCommentAtClassEnd(token) {
                return isCommentAtParentEnd(token, "ClassBody");
            }