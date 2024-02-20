function getYieldOccurrences(node) {
                        const func = getContainingFunction(node);
                        if (!func) {
                            return void 0;
                        }
                        const keywords = [];
                        forEachChild(func, (child) => {
                            traverseWithoutCrossingFunction(child, (node2) => {
                                if (isYieldExpression(node2)) {
                                    pushKeywordIf(keywords, node2.getFirstToken(), 125 /* YieldKeyword */);
                                }
                            });
                        });
                        return keywords;
                    }