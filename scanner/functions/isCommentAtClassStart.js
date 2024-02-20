function isCommentAtClassStart(token) {
                return isCommentAtParentStart(token, "ClassBody");
            }