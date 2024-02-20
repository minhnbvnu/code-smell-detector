function checkJsxChildren(node, checkMode) {
                const childrenTypes = [];
                for (const child of node.children) {
                    if (child.kind === 11 /* JsxText */) {
                        if (!child.containsOnlyTriviaWhiteSpaces) {
                            childrenTypes.push(stringType);
                        }
                    }
                    else if (child.kind === 291 /* JsxExpression */ && !child.expression) {
                        continue;
                    }
                    else {
                        childrenTypes.push(checkExpressionForMutableLocation(child, checkMode));
                    }
                }
                return childrenTypes;
            }