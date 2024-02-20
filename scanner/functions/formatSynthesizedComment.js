function formatSynthesizedComment(comment) {
                return comment.kind === 3 /* MultiLineCommentTrivia */ ? `/*${comment.text}*/` : `//${comment.text}`;
            }