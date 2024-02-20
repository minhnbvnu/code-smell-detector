function getElaborationElementForJsxChild(child, nameType, getInvalidTextDiagnostic) {
                switch (child.kind) {
                    case 291 /* JsxExpression */:
                        return { errorNode: child, innerExpression: child.expression, nameType };
                    case 11 /* JsxText */:
                        if (child.containsOnlyTriviaWhiteSpaces) {
                            break;
                        }
                        return { errorNode: child, innerExpression: void 0, nameType, errorMessage: getInvalidTextDiagnostic() };
                    case 281 /* JsxElement */:
                    case 282 /* JsxSelfClosingElement */:
                    case 285 /* JsxFragment */:
                        return { errorNode: child, innerExpression: child, nameType };
                    default:
                        return Debug.assertNever(child, "Found invalid jsx child");
                }
            }