function getSuggestionForNonexistentIndexSignature(objectType, expr, keyedType) {
                function hasProp(name) {
                    const prop = getPropertyOfObjectType(objectType, name);
                    if (prop) {
                        const s = getSingleCallSignature(getTypeOfSymbol(prop));
                        return !!s && getMinArgumentCount(s) >= 1 && isTypeAssignableTo(keyedType, getTypeAtPosition(s, 0));
                    }
                    return false;
                }
                const suggestedMethod = isAssignmentTarget(expr) ? "set" : "get";
                if (!hasProp(suggestedMethod)) {
                    return void 0;
                }
                let suggestion = tryGetPropertyAccessOrIdentifierToString(expr.expression);
                if (suggestion === void 0) {
                    suggestion = suggestedMethod;
                }
                else {
                    suggestion += "." + suggestedMethod;
                }
                return suggestion;
            }