function getIfElseKeywords(ifStatement, sourceFile) {
                        const keywords = [];
                        while (isIfStatement(ifStatement.parent) && ifStatement.parent.elseStatement === ifStatement) {
                            ifStatement = ifStatement.parent;
                        }
                        while (true) {
                            const children = ifStatement.getChildren(sourceFile);
                            pushKeywordIf(keywords, children[0], 99 /* IfKeyword */);
                            for (let i = children.length - 1; i >= 0; i--) {
                                if (pushKeywordIf(keywords, children[i], 91 /* ElseKeyword */)) {
                                    break;
                                }
                            }
                            if (!ifStatement.elseStatement || !isIfStatement(ifStatement.elseStatement)) {
                                break;
                            }
                            ifStatement = ifStatement.elseStatement;
                        }
                        return keywords;
                    }