function getSemanticJsxChildren(children) {
            return filter(children, (i) => {
                switch (i.kind) {
                    case 291 /* JsxExpression */:
                        return !!i.expression;
                    case 11 /* JsxText */:
                        return !i.containsOnlyTriviaWhiteSpaces;
                    default:
                        return true;
                }
            });
        }