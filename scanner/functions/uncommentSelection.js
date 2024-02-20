function uncommentSelection(fileName, textRange) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const textChanges2 = [];
                const { pos } = textRange;
                let { end } = textRange;
                if (pos === end) {
                    end += isInsideJsxElement(sourceFile, pos) ? 2 : 1;
                }
                for (let i = pos; i <= end; i++) {
                    const commentRange = isInComment(sourceFile, i);
                    if (commentRange) {
                        switch (commentRange.kind) {
                            case 2 /* SingleLineCommentTrivia */:
                                textChanges2.push.apply(textChanges2, toggleLineComment(fileName, { end: commentRange.end, pos: commentRange.pos + 1 }, 
                                /*insertComment*/
                                false));
                                break;
                            case 3 /* MultiLineCommentTrivia */:
                                textChanges2.push.apply(textChanges2, toggleMultilineComment(fileName, { end: commentRange.end, pos: commentRange.pos + 1 }, 
                                /*insertComment*/
                                false));
                        }
                        i = commentRange.end + 1;
                    }
                }
                return textChanges2;
            }