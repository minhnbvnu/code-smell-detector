function getAsyncAndAwaitOccurrences(node) {
                        const func = getContainingFunction(node);
                        if (!func) {
                            return void 0;
                        }
                        const keywords = [];
                        if (func.modifiers) {
                            func.modifiers.forEach((modifier) => {
                                pushKeywordIf(keywords, modifier, 132 /* AsyncKeyword */);
                            });
                        }
                        forEachChild(func, (child) => {
                            traverseWithoutCrossingFunction(child, (node2) => {
                                if (isAwaitExpression(node2)) {
                                    pushKeywordIf(keywords, node2.getFirstToken(), 133 /* AwaitKeyword */);
                                }
                            });
                        });
                        return keywords;
                    }