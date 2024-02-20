function isCommentToken(token) {
        return token.type === "Line" || token.type === "Block" || token.type === "Shebang";
    }