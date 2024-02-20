function convertParameterToNamedTupleMember(p) {
                Debug.assert(isIdentifier(p.name));
                const result = setTextRange(factory.createNamedTupleMember(p.dotDotDotToken, p.name, p.questionToken, p.type || factory.createKeywordTypeNode(131 /* AnyKeyword */)), p);
                const parameterDocComment = p.symbol && p.symbol.getDocumentationComment(checker);
                if (parameterDocComment) {
                    const newComment = displayPartsToString(parameterDocComment);
                    if (newComment.length) {
                        setSyntheticLeadingComments(result, [{
                                text: `*
${newComment.split("\n").map((c) => ` * ${c}`).join("\n")}
 `,
                                kind: 3 /* MultiLineCommentTrivia */,
                                pos: -1,
                                end: -1,
                                hasTrailingNewLine: true,
                                hasLeadingNewline: true
                            }]);
                    }
                }
                return result;
            }