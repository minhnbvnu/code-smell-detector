function getEditsForToTemplateLiteral(context, node) {
            const maybeBinary = getParentBinaryExpression(node);
            const file = context.file;
            const templateLiteral = nodesToTemplate(treeToArray(maybeBinary), file);
            const trailingCommentRanges = getTrailingCommentRanges(file.text, maybeBinary.end);
            if (trailingCommentRanges) {
                const lastComment = trailingCommentRanges[trailingCommentRanges.length - 1];
                const trailingRange = { pos: trailingCommentRanges[0].pos, end: lastComment.end };
                return ts_textChanges_exports.ChangeTracker.with(context, (t) => {
                    t.deleteRange(file, trailingRange);
                    t.replaceNode(file, maybeBinary, templateLiteral);
                });
            }
            else {
                return ts_textChanges_exports.ChangeTracker.with(context, (t) => t.replaceNode(file, maybeBinary, templateLiteral));
            }
        }