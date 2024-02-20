function isCommentNodeType(token) {
                return token && (token.type === "Block" || token.type === "Line");
            }