function copyExpressionComments(node) {
            const file = node.getSourceFile();
            copyTrailingComments(node, node.expression, file, 3 /* MultiLineCommentTrivia */, 
            /* hasTrailingNewLine */
            false);
            copyTrailingAsLeadingComments(node.expression, node.expression, file, 3 /* MultiLineCommentTrivia */, 
            /* hasTrailingNewLine */
            false);
        }