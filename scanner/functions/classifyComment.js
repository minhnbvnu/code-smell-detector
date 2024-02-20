function classifyComment(token, kind, start, width) {
                if (kind === 3 /* MultiLineCommentTrivia */) {
                    const docCommentAndDiagnostics = parseIsolatedJSDocComment(sourceFile.text, start, width);
                    if (docCommentAndDiagnostics && docCommentAndDiagnostics.jsDoc) {
                        setParent(docCommentAndDiagnostics.jsDoc, token);
                        classifyJSDocComment(docCommentAndDiagnostics.jsDoc);
                        return;
                    }
                }
                else if (kind === 2 /* SingleLineCommentTrivia */) {
                    if (tryClassifyTripleSlashComment(start, width)) {
                        return;
                    }
                }
                pushCommentRange(start, width);
            }