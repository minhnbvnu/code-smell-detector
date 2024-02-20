function is_some_comments(comment) {
            // multiline comment
            return ((comment.type === "comment2" || comment.type === "comment1")
                && /@preserve|@copyright|@lic|@cc_on|^\**!/i.test(comment.value));
        }