function has_newline_before(token) {
                return token.nlb || !token.comments_before.every((comment) => !comment.nlb);
            }