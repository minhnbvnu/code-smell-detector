function getAllPromiseExpressionsToReturn(func, checker) {
            if (!func.body) {
                return /* @__PURE__ */ new Set();
            }
            const setOfExpressionsToReturn = /* @__PURE__ */ new Set();
            forEachChild(func.body, function visit(node) {
                if (isPromiseReturningCallExpression(node, checker, "then")) {
                    setOfExpressionsToReturn.add(getNodeId(node));
                    forEach(node.arguments, visit);
                }
                else if (isPromiseReturningCallExpression(node, checker, "catch") || isPromiseReturningCallExpression(node, checker, "finally")) {
                    setOfExpressionsToReturn.add(getNodeId(node));
                    forEachChild(node, visit);
                }
                else if (isPromiseTypedExpression(node, checker)) {
                    setOfExpressionsToReturn.add(getNodeId(node));
                }
                else {
                    forEachChild(node, visit);
                }
            });
            return setOfExpressionsToReturn;
        }