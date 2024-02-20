function getAddCommentsFunction(targetNode, sourceFile, commentKind, hasTrailingNewLine, cb) {
            return (pos, end, kind, htnl) => {
                if (kind === 3 /* MultiLineCommentTrivia */) {
                    pos += 2;
                    end -= 2;
                }
                else {
                    pos += 2;
                }
                cb(targetNode, commentKind || kind, sourceFile.text.slice(pos, end), hasTrailingNewLine !== void 0 ? hasTrailingNewLine : htnl);
            };
        }