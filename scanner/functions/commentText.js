function commentText(sourceText, comment) {
        return sourceText.substring(comment.pos + 2, comment.kind === ts.SyntaxKind.SingleLineCommentTrivia ? comment.end : comment.end - 2);
    }