function getIfElseOccurrences(ifStatement, sourceFile) {
                        const keywords = getIfElseKeywords(ifStatement, sourceFile);
                        const result = [];
                        for (let i = 0; i < keywords.length; i++) {
                            if (keywords[i].kind === 91 /* ElseKeyword */ && i < keywords.length - 1) {
                                const elseKeyword = keywords[i];
                                const ifKeyword = keywords[i + 1];
                                let shouldCombineElseAndIf = true;
                                for (let j = ifKeyword.getStart(sourceFile) - 1; j >= elseKeyword.end; j--) {
                                    if (!isWhiteSpaceSingleLine(sourceFile.text.charCodeAt(j))) {
                                        shouldCombineElseAndIf = false;
                                        break;
                                    }
                                }
                                if (shouldCombineElseAndIf) {
                                    result.push({
                                        fileName: sourceFile.fileName,
                                        textSpan: createTextSpanFromBounds(elseKeyword.getStart(), ifKeyword.end),
                                        kind: "reference" /* reference */
                                    });
                                    i++;
                                    continue;
                                }
                            }
                            result.push(getHighlightSpanForNode(keywords[i], sourceFile));
                        }
                        return result;
                    }