function convertComments(ast, code) {
        const comments = [];
        (0, util_1.forEachComment)(ast, (_, comment) => {
            const type = comment.kind === ts.SyntaxKind.SingleLineCommentTrivia
                ? ts_estree_1.AST_TOKEN_TYPES.Line
                : ts_estree_1.AST_TOKEN_TYPES.Block;
            const range = [comment.pos, comment.end];
            const loc = (0, node_utils_1.getLocFor)(range[0], range[1], ast);
            // both comments start with 2 characters - /* or //
            const textStart = range[0] + 2;
            const textEnd = comment.kind === ts.SyntaxKind.SingleLineCommentTrivia
                ? // single line comments end at the end
                    range[1] - textStart
                : // multiline comments end 2 characters early
                    range[1] - textStart - 2;
            comments.push({
                type,
                value: code.slice(textStart, textStart + textEnd),
                range,
                loc,
            });
        }, ast);
        return comments;
    }